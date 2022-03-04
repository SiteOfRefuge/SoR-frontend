import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  VStack,
  Divider,
  Checkbox, 
} from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PrimaryButton from './PrimaryButton'


export default function RefugeeSignupForm({ onSignup } : { onSignup: () => void}) {
  return (
    <VStack spacing='16px'>
      <FormControl>
        <FormLabel htmlFor='firstName'><Trans>First Name</Trans></FormLabel>
        <Input id='firstName' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='lastName'><Trans>Last Name</Trans></FormLabel>
        <Input id='lastName' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='phone'><Trans>Phone number</Trans></FormLabel>
        <Input id='phone' type='tel' />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='email'><Trans>Email address</Trans></FormLabel>
        <Input id='email' type='email' placeholder='name@example.com' />
      </FormControl>
      <Divider />
      <FormControl>
        <FormLabel htmlFor='adults'><Trans>Number of adults</Trans></FormLabel>
        <NumberInput defaultValue={0} min={0} max={20}>
        <NumberInputField id='adults' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <FormLabel htmlFor='children'><Trans>Number of children</Trans></FormLabel>
        <NumberInput defaultValue={0} min={0} max={20}>
        <NumberInputField id='children' />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
      <FormControl>
        <Checkbox id='pets'><Trans>I have pets</Trans></Checkbox>
      </FormControl>
      <FormControl>
        <Checkbox id='men'><Trans>I have adult men in my group</Trans></Checkbox>
      </FormControl>
      <PrimaryButton width='sm' onClick={onSignup}><Trans>Sign Up</Trans></PrimaryButton>
    </VStack>
  )
}