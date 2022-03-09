import { useState, useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { messages } from './locales/en/messages'

import { defaultLocale, dynamicActivate } from "./i18n";
import { LangContext } from "./context/lang"
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
  const [lang, setLang] = useState(defaultLocale);

  useEffect(() => {
    dynamicActivate(lang);
  }, [lang])

  return (
    <I18nProvider i18n={i18n}>
      <ChakraProvider theme={theme}>
        <LangContext.Provider value={[lang, setLang]}>
          <Router />
        </LangContext.Provider>
      </ChakraProvider>
    </I18nProvider>
  );
};
