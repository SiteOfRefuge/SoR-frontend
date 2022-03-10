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
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import PrimaryButton from '../components/PrimaryButton';
import { Routes } from '../enums/routes';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
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
                  size="lg" 
                  width='310px' 
                  onClick={() => navigate(Routes.SIGNUP_TO_REQUEST_SHELTER)} 
                >
                  <Trans>I need shelter</Trans>
                </PrimaryButton>
              </Center>
            </Box>
            <Box>
              <Center>
                <Button 
                  size="lg" 
                  width='310px' 
                  onClick={() => navigate(Routes.SIGNUP_TO_OFFER_SHELTER)}
                >
                  <Trans>I can offer shelter</Trans>
                </Button>
              </Center>
            </Box>
          </SimpleGrid>
        </VStack>
      </Center>
    </>
  );
}