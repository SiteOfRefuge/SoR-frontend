import { Button, ButtonProps } from "@chakra-ui/react"

export default function PrimaryButton(props: ButtonProps) {
  return <Button
    bg='blue.700' color='white'
    _hover={{bg: 'blue.900'}} _active={{bg: 'blue.800'}}
    {...props} />
  
}