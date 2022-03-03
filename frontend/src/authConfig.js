import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "30222d8b-d3d1-4f62-9a2c-8161c2252e5b",
    authority: "https://siteofrefugeb2c.b2clogin.com/siteofrefugeb2c.onmicrosoft.com/B2C_1_sms_registry",
    redirectUri: "http://localhost:3000",
    knownAuthorities: ["siteofrefugeb2c.b2clogin.com"], // You must identify your tenant's domain as a known authority.

  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
          }
        }
      }
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
 scopes: ["https://graph.microsoft.com/User.Read"]
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
};
