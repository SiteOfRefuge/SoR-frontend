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
  Checkbox, 
  CheckboxGroup,
  Box,
  SimpleGrid,
  Select,
  Textarea
} from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PrimaryButton from './PrimaryButton'
import { useForm, useController } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { RefugeeForm } from '../types';
import { APIS, useAuthorizedApi } from '../api';
import { RefugeeProfile } from '../apiTypes';
import { regionByCountry } from '../regions';

export default function RefugeeSignupForm({ onSignup } : { onSignup: () => void}) {
  const { register, control, handleSubmit } = useForm<RefugeeForm>({
    defaultValues: {},
  });

  const addRefuge = useAuthorizedApi(APIS.ADD_REFUGEE)

  const onSubmit = handleSubmit(data => {
    const uuid = uuidv4();
    const submission: RefugeeProfile = {
      id: uuid,
      summary: {
        ...data.summary,
        id: uuid
      },
      contact: {
        id: uuid,
        firstName: data.firstName,
        lastName: data.lastName,
        methods: [],
      }
    };
    if (data.phone) {
      submission.contact.methods.push({
        id: uuidv4(),
        method: 'Phone',
        value: data.phone,
        verified: false,
      })
    }
    if (data.email) {
      submission.contact.methods.push({
        id: uuidv4(),
        method: 'Email',
        value: data.email,
        verified: false,
      })
    }
    // TODO: Something different for SMS?
    console.log('Creating account', submission);
    addRefuge(submission);
  });

  const restrictions = useController({
    control,
    name: 'summary.restrictions'
  });

  const languages = useController({
    control,
    name: 'summary.languages'
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
          <Input id='lastInitial' {...register('lastName', { minLength: 1, maxLength: 1 })}/>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='posession_date'><Trans>Start Date</Trans></FormLabel>
          <Input id='posession_date' placeholder='YYYY-MM-DD'
            {...register('summary.possession_date', { /*valueAsDate: true*/ })}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='phone'><Trans>Phone number</Trans></FormLabel>
          <Input id='phone' type='tel' {...register('phone')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'><Trans>Email address</Trans></FormLabel>
          <Input id='email' type='email' placeholder='name@example.com' {...register('email')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='region'><Trans>Region</Trans></FormLabel>
          <Select id='region' {...register('summary.region')}>
            {Object.keys(regionByCountry).map(country => {
              const regions = regionByCountry[country];
              return (
                <optgroup label={country} key={country}>
                  {regions.map(r => <option key={r.code} value={r.code}>{r.code}: {r.name}</option>)}
                </optgroup>
              );
            })}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='people'><Trans>People in group</Trans></FormLabel>
          <NumberInput defaultValue={0} min={0} max={20}>
            <NumberInputField type='number' id='people'
              {...register('summary.people', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <CheckboxGroup onChange={v => restrictions.field.onChange(v)}>
            <Box>
              <FormLabel><Trans>Group Members</Trans></FormLabel>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <Checkbox id='men' value='Adult men'>Adult Men</Checkbox>
                <Checkbox id='women' value='Adult women'>Adult Women</Checkbox>
                <Checkbox id='minors' value='Kids'>Minors(0-16)</Checkbox>
              </SimpleGrid>
            </Box>
            <Box pt='16px'>
              <FormLabel><Trans>Pets</Trans></FormLabel>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <Checkbox id='dogs' value='Dogs'>Pet Dog</Checkbox>
                <Checkbox id='cats' value='Cats'>Pet Cat</Checkbox>
                <Checkbox id='pets' value='Other pets'>Other Pet</Checkbox>
              </SimpleGrid>
            </Box>
          </CheckboxGroup>
        </FormControl>
        <FormControl>
          <FormLabel><Trans>Languages Spoken</Trans></FormLabel>
          <CheckboxGroup onChange={v => languages.field.onChange(v)}>
            <SimpleGrid columns={[2, null, 4]} spacing='10px'>
              <Checkbox id='English' value='English'><Trans>English</Trans></Checkbox>
              <Checkbox id='Ukrainian' value='Ukrainian'><Trans>Ukrainian</Trans></Checkbox>
              <Checkbox id='Polish' value='Polish'><Trans>Polish</Trans></Checkbox>
              <Checkbox id='Russian' value='Russian'><Trans>Russian</Trans></Checkbox>
              <Checkbox id='Slovak' value='Slovak'><Trans>Slovak</Trans></Checkbox>
              <Checkbox id='Hungarian' value='Hungarian'><Trans>Hungarian</Trans></Checkbox>
              <Checkbox id='Romanian' value='Romanian'><Trans>Romanian</Trans></Checkbox>
              <Checkbox id='Other' value='Other'><Trans>Other</Trans></Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='message'><Trans>Message</Trans></FormLabel>
          <Textarea id='message' {...register('summary.message')}/>
        </FormControl>

        <Box pt='24px'>
          <PrimaryButton width='xs' type='submit'><Trans>Sign Up</Trans></PrimaryButton>
        </Box>
      </VStack>
    </form>
  )
}