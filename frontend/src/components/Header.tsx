import { useContext } from "react"
import {
  Box,
  Flex,
  HStack,
  Image,
  IconButton,
  useDisclosure,
  Stack,
  Heading,
  Divider,
  Select,
} from '@chakra-ui/react';
import { Link } from "react-router-dom"
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Trans } from '@lingui/macro';
import { SupportedLocale, locales } from '../i18n';
import { SignInSignOutButton } from "./SignInSignOutButton";
import { LangContext } from "../context/lang"

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lang, setVal] = useContext(LangContext);

  return (
    <>
      <Box>
        <Box mx='24px' my='8px'>
          <Select value={lang} onChange={e => setVal(e.target.value as SupportedLocale)} size='sm' width='90px'>
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
                <Link to="/about">
                  <Trans>About Us</Trans>
                </Link>
                <SignInSignOutButton />
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
