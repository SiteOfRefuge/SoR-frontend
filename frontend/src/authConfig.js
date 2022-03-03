//import { Configuration, RedirectRequest } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "30222d8b-d3d1-4f62-9a2c-8161c2252e5b",
    authority: "https://login.microsoftonline.com/siteofrefugeb2c.onmicrosoft.com", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
