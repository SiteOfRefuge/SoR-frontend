import {
  Box,
  Center,
  SimpleGrid,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { SignupFlows } from '../types';


export default function LandingPage({ setSignupFlow }: {setSignupFlow: (v: SignupFlows) => void}) {
  return (
    <Center>
      <VStack mt='100'>
        <Heading fontSize='5xl'>Site of Refuge</Heading>
        <Text fontSize='lg' maxWidth='440px' textAlign='center'>
          Dedicated to connecting refugees with people willing to open their doors.
        </Text>
        <SimpleGrid pt='32px' columns={{sm: 1, md: 2}} spacing='16px'>
          <Box>
            <Center>
              <Button
                size="lg" bg='blue.700' color='white' _hover={{bg: 'blue.900'}} width='310px'
                onClick={() => setSignupFlow('refugee')}
              >
                <Trans>I need shelter</Trans>
              </Button>
            </Center>
          </Box>
          <Box>
            <Center>
              <Button size="lg" width='310px' onClick={() => setSignupFlow('host')}>
                <Trans>I can offer shelter</Trans>
              </Button>
            </Center>
          </Box>
        </SimpleGrid>
      </VStack>
    </Center>
  );
}