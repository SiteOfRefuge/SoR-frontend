import {
  Button,
  HStack,
  Input,
  InputGroup,
  useNumberInput,
} from "@chakra-ui/react"
import { SyntheticEvent, useEffect } from "react"
import { UseControllerReturn, UseFormRegisterReturn } from "react-hook-form"

export const NumberInputWithStepper = ({
  onChange,
}: {
  onChange: (e: unknown) => void
}) => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
      max: 20,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  const inputElement = input as unknown as HTMLInputElement
  useEffect(() => {
    onChange(inputElement.value)
  }, [inputElement.value, onChange])
  return (
    <InputGroup>
      <Button {...dec} borderRightRadius="0" size="lg">
        -
      </Button>
      <Input
        value={(input as unknown as HTMLInputElement).value}
        onChange={onChange}
        borderRadius="0"
        m="0"
        marginInlineStart="0"
        textAlign="center"
        size="lg"
      />
      <Button {...inc} borderLeftRadius="0" size="lg">
        +
      </Button>
    </InputGroup>
  )
}
