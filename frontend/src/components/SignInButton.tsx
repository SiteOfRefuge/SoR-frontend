import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button, UseToastOptions, ToastId, useToast } from '@chakra-ui/react';
import { IPublicClientApplication } from "@azure/msal-browser";
import { Trans } from "@lingui/macro";

function handleLogin(instance: IPublicClientApplication,
      toast: (options?: UseToastOptions) => ToastId | undefined) {
    const req = instance.loginPopup(loginRequest);
    req
      .then(resp => console.log(resp))
      .catch(e => {
        toast({ 
          // Ideally would use <Trans> here, hut currently
          // the toast is rendered outside the i18n provider
          title: "Error: Could not log in",
          description: e.errorMessage,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
    const { instance } = useMsal();
    const toast = useToast();

    return (
      <Button variant="secondary" className="ml-auto" onClick={() => handleLogin(instance, toast)}>
        <Trans>Sign in</Trans>
      </Button>
    );
}
