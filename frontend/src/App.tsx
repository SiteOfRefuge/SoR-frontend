import React, { useEffect } from "react";
import { ChakraProvider, extendTheme, Center, Box, Button, Link, Text, SimpleGrid, Flex, Heading, VStack } from '@chakra-ui/react';
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { Trans } from '@lingui/macro';
import { messages } from './locales/en/messages'

import Header from "./components/Header";
import { defaultLocale, dynamicActivate } from "./i18n";


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
  useEffect(() => {
    dynamicActivate(lang);
  }, [lang])

  return (
    <I18nProvider i18n={i18n}>
    {/* <IntlProvider locale={lang} messages={messages[lang]} defaultLocale={defaultLocale}> */}
      <ChakraProvider theme={theme}>
        <Flex direction='column' height='100%' bg='gray.50'>
          <Box flex='1 0 auto'>
            <Header onLangChange={setLang} />
            <Center>
              <VStack mt='100'>
                <Heading fontSize='5xl'>Site of Refuge</Heading>
                <Text fontSize='lg' maxWidth='440px' textAlign='center'>
                  Dedicated to connecting refugees with people willing to open their doors.
                </Text>
                <SimpleGrid pt='32px' columns={{sm: 1, md: 2}} spacing='16px'>
                  <Box>
                    <Center>
                      <Button size="lg" bg='blue.700' color='white' _hover={{bg: 'blue.900'}} width='310px'>
                        <Trans>I need shelter</Trans>
                      </Button>
                    </Center>
                  </Box>
                  <Box>
                    <Center>
                      <Button size="lg" width='310px'>
                        <Trans>I can offer shelter</Trans>
                      </Button>
                    </Center>
                  </Box>
                </SimpleGrid>
              </VStack>
            </Center>
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

