import { useMsal } from '@azure/msal-react';
import { InteractionStatus, InteractionRequiredAuthError } from '@azure/msal-browser';

import { msalConfig } from './authConfig';
import { ApiDefinition } from './apiTypes';


export const APIS: {[key: string]: ApiDefinition} = {
  ADD_REFUGEE: { url: '/v1/refugees', method: 'POST' },
  GET_REFUGEES: { url: '/v1/refugees', method: 'GET' }
  // Add further APIs here...
}

export type Endpoints = keyof typeof APIS;

function callApi(api: ApiDefinition, accessToken: string, bodyData?: any) {
  const headers = new Headers();
  const bearer = "Bearer " + accessToken;
  headers.append("Authorization", bearer);
  headers.append("Content-Type", "application/json")

  fetch(api.url, {
    method: api.method,
    mode: 'cors',
    headers,
    body: (api.method === 'POST' && bodyData !== undefined) ?
      JSON.stringify(bodyData) : undefined,
  }).then(
    // TODO: plumb in callback for GETs
    resp => console.log('resp',resp.status)
  ).catch(
    // TODO plumb in error handling callbacks (or just return this promise? )
    err => console.log('Error requesting', api, err)
  );
}

export function useAuthorizedApi(api: ApiDefinition) {
  const { instance, inProgress, accounts } = useMsal();
  return (bodyData?: any) => {
    if (inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: [msalConfig.auth.clientId],
        account: accounts[0]
      }

      instance.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
        // Acquire token silent success
        let accessToken = accessTokenResponse.accessToken;
        return callApi(api, accessToken, bodyData);
      }).catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
            // Acquire token interactive success
            let accessToken = accessTokenResponse.accessToken;
            return callApi(api, accessToken, bodyData);
          }).catch(function(error) {
            // Acquire token interactive failure
            console.log(error);
          });
        }
        console.log(error);
        // TODO: return a failed promise
      });
    }
  }
}