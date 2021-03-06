import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Checkbox,
  CheckboxGroup,
  Box,
  SimpleGrid,
  Select,
  Textarea,
  Divider,
  InputGroup,
  Switch,
  InputLeftElement,
} from '@chakra-ui/react'
import { Trans } from '@lingui/macro'
import PrimaryButton from './PrimaryButton'
import { useForm, useController } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import DatePicker from 'react-datepicker'
import { HostForm } from '../types'
import { useContext } from 'react'
// import { APIS, useAuthorizedApi } from '../api';
import { ContactMethods, DateYY_MM_DD, HostProfile } from '../apiTypes'
import { format, parse } from 'date-fns'
import { i18n } from '@lingui/core'
import { LangContext } from '../context/lang'
import { APIS, useAuthorizedApi } from '../api';
import { regionByCountry } from '../regions';

const contactMethod = (method: ContactMethods, value: string) => ({
  id: uuidv4(),
  method,
  value,
  verified: false,
})

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd') as DateYY_MM_DD
const parseDate = (date: string) => parse(date, 'yyyy-MM-dd', new Date())

export default function RefugeeSignupForm({
  onSignup,
}: {
  onSignup: () => void
}) {
  const { register, control, handleSubmit, getValues } = useForm<HostForm>({
    defaultValues: {},
  })
  const addHost = useAuthorizedApi(APIS.ADD_HOST);

  const onSubmit = handleSubmit((data) => {
    const uuid = uuidv4()
    const submission: HostProfile = {
      id: uuid,
      summary: {
        ...data.summary,
        id: uuid,
        availability: {
          ...data.summary.availability,
          id: uuid,
        }
      },
      contact: {
        id: uuid,
        firstName: data.firstName,
        lastName: data.lastName,
        methods: [],
      }
    }
    if (data.phone) {
      submission.contact.methods.push(contactMethod('Phone', data.phone))
    }
    if (data.email) {
      submission.contact.methods.push(contactMethod('Email', data.email))
    }
    // TODO: Something different for SMS?
    
    addHost(submission)
  })

  const restrictions = useController({
    control,
    name: 'summary.restrictions',
    defaultValue: [],
  })

  const languages = useController({
    control,
    name: 'summary.languages',
    defaultValue: [],
  })

  const dateAvailable = useController({
    control,
    name: 'summary.availability.date_available',
    defaultValue: formatDate(new Date()),
  })

  const active = useController({
    control,
    name: 'summary.availability.active',
    defaultValue: false,
  })

  return (
    <form onSubmit={onSubmit}>
      <VStack spacing='16px'>
        <FormControl>
          <FormLabel htmlFor='firstName'>
            <Trans>First Name</Trans>
          </FormLabel>
          <Input id='firstName' {...register('firstName')} />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='lastInitial'>
            <Trans>Last Name</Trans>
          </FormLabel>
          <Input
            id='lastInitial'
            {...register('lastName')}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='phone'>
            <Trans>Phone number</Trans>
          </FormLabel>
          <InputGroup>
            <InputLeftElement children='+' />
            <Input id='phone' type='tel' {...register('phone')} />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='email'>
            <Trans>Email address</Trans>
          </FormLabel>
          <Input
            id='email'
            type='email'
            placeholder='name@example.com'
            {...register('email')}
          />
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
        <Divider />
        <FormControl>
          <FormLabel htmlFor='allowed_people'>
            <Trans>Allowed people</Trans>
          </FormLabel>
          <NumberInput defaultValue={0} min={0} max={20}>
            <NumberInputField
              type='number'
              id='allowed_people'
              {...register('summary.allowed_people', { valueAsNumber: true })}
            />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <CheckboxGroup onChange={(v) => restrictions.field.onChange(v)}>
            <Box>
              <FormLabel>
                <Trans>Group Members</Trans>
              </FormLabel>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <Checkbox id='men' value='Adult men'>
                  Adult Men
                </Checkbox>
                <Checkbox id='women' value='Adult women'>
                  Adult Women
                </Checkbox>
                <Checkbox id='minors' value='Kids'>
                  Minors(0-16)
                </Checkbox>
              </SimpleGrid>
            </Box>
            <Box pt='16px'>
              <FormLabel>
                <Trans>Pets</Trans>
              </FormLabel>
              <SimpleGrid columns={[2, null, 3]} spacing='10px'>
                <Checkbox id='dogs' value='Dogs'>
                  Pet Dog
                </Checkbox>
                <Checkbox id='cats' value='Cats'>
                  Pet Cat
                </Checkbox>
                <Checkbox id='pets' value='Other pets'>
                  Other Pet
                </Checkbox>
              </SimpleGrid>
            </Box>
          </CheckboxGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='shelter'>
            <Trans>Shelter</Trans>
          </FormLabel>
          <Textarea id='shelter' {...register('summary.shelter')} />
        </FormControl>
        <Divider />
        <FormControl display='flex' alignItems='center'>
          <FormLabel htmlFor='avaliable' mb='0'>
            <Trans>Avaliable</Trans>
          </FormLabel>
          <Switch
            id='avaliable'
            onChange={(state) => active.field.onChange(state)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='avaliability-date'>
            <Trans>Availability</Trans>
          </FormLabel>
          <DatePicker
            id='avaliability-date'
            selected={parseDate(dateAvailable.field.value)}
            onChange={(date) =>
              dateAvailable.field.onChange(formatDate(date as Date))
            }
            disabled={!getValues('summary.availability.active')}
            showPopperArrow={true}
            minDate={new Date()}
            dateFormat='dd-MM-yyyy'
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='region'>
            <Trans>Length of stay</Trans>
          </FormLabel>
          <Select
            id='region'
            {...register('summary.availability.length_of_stay')}
          >
            <option key='Less than 3 days' value='Less than 3 days'>
              {i18n._('less_3_days')}
            </option>
            <option key='One week or less' value='One week or less'>
              {i18n._('one_week_less')}
            </option>
            <option key='1-2 weeks' value='1-2 weeks'>
              {i18n._('one_two_weeks')}
            </option>
            <option key='More than 2 weeks' value='More than 2 weeks'>
              {i18n._('more_than_two_weeks')}
            </option>
          </Select>
        </FormControl>
        <Divider />
        <FormControl>
          <FormLabel>
            <Trans>Languages Spoken</Trans>
          </FormLabel>
          <CheckboxGroup onChange={(v) => languages.field.onChange(v)}>
            <SimpleGrid columns={[2, null, 4]} spacing='10px'>
              <Checkbox id='English' value='English'>
                <Trans>English</Trans>
              </Checkbox>
              <Checkbox id='Ukrainian' value='Ukrainian'>
                <Trans>Ukrainian</Trans>
              </Checkbox>
              <Checkbox id='Polish' value='Polish'>
                <Trans>Polish</Trans>
              </Checkbox>
              <Checkbox id='Russian' value='Russian'>
                <Trans>Russian</Trans>
              </Checkbox>
              <Checkbox id='Slovak' value='Slovak'>
                <Trans>Slovak</Trans>
              </Checkbox>
              <Checkbox id='Hungarian' value='Hungarian'>
                <Trans>Hungarian</Trans>
              </Checkbox>
              <Checkbox id='Romanian' value='Romanian'>
                <Trans>Romanian</Trans>
              </Checkbox>
              <Checkbox id='Other' value='Other'>
                <Trans>Other</Trans>
              </Checkbox>
            </SimpleGrid>
          </CheckboxGroup>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor='message'>
            <Trans>Message</Trans>
          </FormLabel>
          <Textarea id='message' {...register('summary.message')} />
        </FormControl>

        <Box pt='24px'>
          <PrimaryButton width='xs' type='submit'>
            <Trans>Sign Up</Trans>
          </PrimaryButton>
        </Box>
      </VStack>
    </form>
  )
}
