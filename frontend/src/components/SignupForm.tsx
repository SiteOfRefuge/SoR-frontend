import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Link,
  VStack
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';

export default function SignupForm({ exitSignup } : { exitSignup: () => void}) {
  return (
    <Center>
      <VStack>
        <Heading fontSize='3xl'>
          <Trans>Sign Up</Trans>
        </Heading>
        <HStack spacing='2'>
          <Box>
            <Trans>Have an account already? </Trans>
          </Box>
          <Link color='blue.700'>
            <Trans>Log In</Trans>
          </Link>
        </HStack>
        <Button onClick={exitSignup}>
          Done
        </Button>
      </VStack>
    </Center>
  );
}
