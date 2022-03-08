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
import PrimaryButton from '../components/PrimaryButton';


export default function LandingPage() {
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
              <PrimaryButton
                size="lg" width='310px'
              >
                <Trans>I need shelter</Trans>
              </PrimaryButton>
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
  );
}