import {
  Box,
  Flex,
  HStack,
  Image,
  Link,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Heading,
  Divider,
  Select,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Trans } from '@lingui/macro';
import { SupportedLocale, locales } from '../i18n';
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";

export default function Header({ lang, onLangChange }: {lang: SupportedLocale, onLangChange: (v: SupportedLocale) => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
      <Box>
        <Box mx='24px' my='8px'>
          <Select value={lang} onChange={e => onLangChange(e.target.value as SupportedLocale)} size='sm' width='90px'>
            {
              Object.keys(locales).map(l =>
                <option key={l} value={l}>🌐 {l.toUpperCase()}</option>
              )
            }
          </Select>
        </Box>
        <Divider />
        <Box px={4} mx='24px'>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={4} alignItems={'center'}>
              <Image
                borderRadius='full'
                borderWidth='10px'
                borderColor='blue.700'
                boxSize='45px'
                src='logo512.png'
                alt='Site Logo'
              />
              <Heading as='h1' size='lg' id='logo' color='#5B75B4' fontFamily='"Outfit", sans-serif'>Site of Refuge</Heading>
            </HStack>
            <Flex alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <Link>
                  <Trans>About Us</Trans>
                </Link>
                { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
              </HStack>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {/* Nothing in the menu for now */}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
