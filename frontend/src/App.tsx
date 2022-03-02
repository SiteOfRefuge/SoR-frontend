import React, { useEffect } from "react";
import { ChakraProvider, extendTheme, Center, Box, Button, Link, Text, SimpleGrid, Flex, Heading, VStack } from '@chakra-ui/react';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { Trans } from '@lingui/macro';
import { messages } from './locales/en/messages'

import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import SignupForm from "./components/SignupForm";

import { defaultLocale, dynamicActivate } from "./i18n";
import { SignupFlows } from "./types";

// const theme = extendTheme({
//   initialColorMode: 'light',
//   useSystemColorMode: false,
// });

i18n.load(defaultLocale, messages)
i18n.activate(defaultLocale)

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
});

export default function App() {
  const [lang, setLang] = React.useState(defaultLocale);
  const [signupFlow, setSignupFlow] = React.useState<SignupFlows>(null); // eventually move to React Router

  useEffect(() => {
    dynamicActivate(lang);
  }, [lang])

  return (
    <I18nProvider i18n={i18n}>
    {/* <IntlProvider locale={lang} messages={messages[lang]} defaultLocale={defaultLocale}> */}
      <ChakraProvider theme={theme}>
        <Flex direction='column' height='100%' bg='gray.50'>
          <Box flex='1 0 auto'>
            <Header lang={lang} onLangChange={setLang} />
            {
              signupFlow === null ?
                <LandingPage setSignupFlow={setSignupFlow}></LandingPage>
                : <SignupForm exitSignup={() => setSignupFlow(null)} />
            }
          </Box>
          <Center margin="80px" as='footer' flexShrink='0'>
            <Link padding='5px'>
              <Trans>About</Trans>
            </Link>
          </Center>
        </Flex>
      </ChakraProvider>
    </I18nProvider>
  );
};

