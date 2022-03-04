import {
  Box,
  Center,
  Heading,
  HStack,
  Link,
  VStack,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { Trans } from '@lingui/macro';
import { useMemo } from 'react';
import { SignupFlows } from '../types';
import RefugeeSignupForm from './RefugeeSignupForm';

export default function SignupForm({ signupFlow, setSignupFlow } : 
  { signupFlow: SignupFlows, setSignupFlow: (v :SignupFlows) => void }) {

  const onSignup = useMemo(() => () => {
    // ... add logic to submit requests
    setSignupFlow(null);
  }, [setSignupFlow]);
  console.log(signupFlow);

  return (
    <Center>
      <VStack spacing='32px'>
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
        <Tabs
          paddingTop='16px'
          colorScheme='gray'
          variant='soft-rounded'
          index={signupFlow === 'refugee' ? 0 : 1}
          onChange={(i) => setSignupFlow(i === 0 ? 'refugee' : 'host')}
        >
          <TabList >
            <Tab><Trans>I need shelter</Trans></Tab>
            <Tab><Trans>I can offer shelter</Trans></Tab>
          </TabList>
          <TabPanels marginTop='16px'>
            <TabPanel>
              <RefugeeSignupForm onSignup={onSignup} />
            </TabPanel>
            <TabPanel>
              <p>Host signup</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Center>
  );
}
