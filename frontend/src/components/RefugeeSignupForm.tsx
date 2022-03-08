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
  CheckboxGroup,
  HStack
} from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PrimaryButton from './PrimaryButton'
import { useForm, useController } from 'react-hook-form';
import { RefugeeSummary } from '../types';
import { APIS, useAuthorizedApi } from '../api';

export default function RefugeeSignupForm({ onSignup } : { onSignup: () => void}) {
  const { register, control, handleSubmit } = useForm<RefugeeSummary>({
    defaultValues: {},
  });

  const addRefuge = useAuthorizedApi(APIS.ADD_REFUGEE)

  const onSubmit = handleSubmit(data => {
    addRefuge(data);
  });

  const restrictions = useController({
    control,
    name: 'restrictions'
  });
  
  return (
    <form onSubmit={onSubmit}>
      <VStack spacing='16px'>
        <FormControl>
          <FormLabel htmlFor='firstName'><Trans>First Name</Trans></FormLabel>
          <Input id='firstName' {...register('firstName')}/>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='lastInitial'><Trans>Last Initial</Trans></FormLabel>
          <Input id='lastInitial' {...register('lastInitial', { minLength: 1, maxLength: 1 })}/>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='phone'><Trans>Phone number</Trans></FormLabel>
          <Input id='phone' type='tel' {...register('phoneNumber')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'><Trans>Email address</Trans></FormLabel>
          <Input id='email' type='email' placeholder='name@example.com' {...register('email')} />
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel htmlFor='people'><Trans>People in group</Trans></FormLabel>
          <NumberInput defaultValue={0} min={0} max={20}>
            <NumberInputField type='number' id='people' {...register('people')} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <CheckboxGroup onChange={v => restrictions.field.onChange(v)}>
            <HStack>
              <Checkbox id='men' value='men'>Adult Men</Checkbox>
              <Checkbox id='women' value='women'>Adult Women</Checkbox>
              <Checkbox id='minors' value='minors'>Minors(0-16)</Checkbox>
            </HStack>
            <HStack >
              <Checkbox id='dogs' value='dogs'>Pet Dog</Checkbox>
              <Checkbox id='cats' value='cats'>Pet Cat</Checkbox>
              <Checkbox id='pets' value='pets'>Other Pet</Checkbox>
            </HStack>
          </CheckboxGroup>
        </FormControl>
        <PrimaryButton width='sm' type='submit'><Trans>Sign Up</Trans></PrimaryButton>
      </VStack>
    </form>
  )
}