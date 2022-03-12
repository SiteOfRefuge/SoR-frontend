import { Flex, Center } from "@chakra-ui/react"
import Header from "../../components/Header"
import HostSignupForm from "../../components/Signup/HostForm"

export default function NeedShelter() {
  return (
    <>
      <Header />
      <Flex direction="column" minHeight="100%">
        <Center>
          <HostSignupForm onSignup={() => {}} />
        </Center>
      </Flex>
    </>
  )
}
