import {
  Box,
  Center,
  Heading,
  Link,
  Text,
  VStack
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';

export default function SignupForm() {

  return (
    <Center>
      <VStack>
        <Heading fontSize='3xl'>
          <Trans>Sign Up</Trans>
        </Heading>
        <Box>
          <Text>
            <Trans>Have an account already?</Trans>
            <Link color='blue.700'>
              <Trans>Log In</Trans>
            </Link>
          </Text>
        </Box>
      </VStack>
    </Center>
  );
}