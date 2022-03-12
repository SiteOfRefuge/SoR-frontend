import React from "react"
import { useMsal } from "@azure/msal-react"
import { Button } from "@chakra-ui/react"
import { Trans } from "@lingui/macro"

export const SignOutButton = () => {
  const { instance } = useMsal()

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "/",
    })
  }

  return (
    <Button variant="secondary" onClick={handleLogout}>
      <Trans>Sign out</Trans>
    </Button>
  )
}
