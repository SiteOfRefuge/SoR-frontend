import { Flex, Box, Center } from "@chakra-ui/react";
import Header from "../../components/Header";
import RefugeeSignupForm from "../../components/RefugeeSignupForm";

export default function NeedShelter() {
    return (
        <>
           <Header />
           <Flex direction='column' minHeight='100%'>
               <Center>
                    <RefugeeSignupForm onSignup={() => {}} />
                </Center>
            </Flex>
        </>
    )
}