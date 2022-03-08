import React, { useEffect } from "react";
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from './locales/en/messages'

import { defaultLocale, dynamicActivate } from "./i18n";
import Router from "./router";

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

  useEffect(() => {
    dynamicActivate(lang);
  }, [lang])

  return (
    <I18nProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </I18nProvider>
  );
};
