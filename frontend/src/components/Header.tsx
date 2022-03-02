import { ReactNode } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Divider,
  Select,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Trans } from '@lingui/macro';
import { SupportedLocale, locales } from '../i18n';

const Links: Array<string> = [];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Header({ onLangChange }: {onLangChange: (v: SupportedLocale) => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>
        <Box mx='24px' my='8px'>
          <Select placeholder='🌐' onChange={e => onLangChange(e.target.value as SupportedLocale)} size='sm' width='90px'>
            {
              Object.keys(locales).map(l => 
                <option key={l} value={l}>{l.toUpperCase()}</option>
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
            <HStack spacing={8} alignItems={'center'}>
              <Heading as='h1' size='lg' id='logo' color='#5B75B4' fontFamily='"Outfit", sans-serif'>Site of Refuge</Heading>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                <Link>
                  <Trans>About Us</Trans>
                </Link>
                <Button variant='outline' borderWidth='2' color='blue.700'>
                  <Trans>Log In</Trans>
                </Button>
                <Button bg='blue.700' color='white' _hover={{bg: 'blue.900'}}>
                  <Trans>Sign up</Trans>
                </Button>
              </HStack>
            </Flex>
          </Flex>

          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
