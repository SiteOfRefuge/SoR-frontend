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
import { useMsal } from '@azure/msal-react';
import { InteractionStatus, InteractionRequiredAuthError } from '@azure/msal-browser';
import { loginRequest } from '../authConfig';



export default function RefugeeSignupForm({ onSignup } : { onSignup: () => void}) {
  const { register, control, handleSubmit } = useForm<RefugeeSummary>({
    defaultValues: {},
  });
  const { instance, inProgress, accounts } = useMsal();

  const doSubmit = (data: RefugeeSummary, accessToken: string) => {
    const headers = new Headers();
    const bearer = "Bearer " + accessToken;
    headers.append("Authorization", bearer);

    fetch('/v1/refugees', {
      method: 'POST',
      mode: 'cors',
      headers,

    })
    console.log(data)
  }

  const onSubmit = handleSubmit(data => {
    // TODO: refactor this into a re-usable hook, once we get it working.
    if (inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: loginRequest.scopes,
        account: accounts[0]
      }
      instance.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
        // Acquire token silent success
        let accessToken = accessTokenResponse.accessToken;
        doSubmit(data, accessToken);
      }).catch((error) => {
        if (error instanceof InteractionRequiredAuthError) {
          instance.acquireTokenPopup(accessTokenRequest).then(function(accessTokenResponse) {
            // Acquire token interactive success
            let accessToken = accessTokenResponse.accessToken;
            doSubmit(data, accessToken);
          }).catch(function(error) {
            // Acquire token interactive failure
            console.log(error);
          });
        }
        console.log(error);
      });
    }
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