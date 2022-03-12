import { IconButton, FormControl, FormLabel, InputGroup } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"
import DatePicker from "react-datepicker"
// import { APIS, useAuthorizedApi } from '../api';
import { DateYY_MM_DD } from "../apiTypes"
import { format, parse } from "date-fns"
import { CalendarIcon } from '@chakra-ui/icons'

const formatDate = (date: Date) => format(date, "yyyy-MM-dd") as DateYY_MM_DD
const parseDate = (date: string) => parse(date, "yyyy-MM-dd", new Date())

export const Calendar = ({
  isActive = true,
  onChange,
  value,
}: {
  isActive: boolean
  value: string
  onChange: (date: string) => void
}) => {
  return (
    <FormControl>
      <FormLabel htmlFor="avaliability-date">
        <Trans>Availability</Trans>
      </FormLabel>
      <InputGroup>
        <DatePicker
          id="avaliability-date"
          selected={parseDate(value)}
          onChange={(date) => onChange(formatDate(date as Date))}
          disabled={isActive}
          showPopperArrow={true}
          minDate={new Date()}
          dateFormat="dd-MM-yyyy"
        />
        <IconButton borderLeftRadius='0' icon={<CalendarIcon />} aria-label="avaliability-date" size="lg" />
      </InputGroup>
    </FormControl>
  )
}
