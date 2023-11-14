"use client";
import userAuth from "@/appwrite/authentication";
import useAuth from "@/context/useAuth";
import { Button } from "@chakra-ui/react";

const LogoutPage = () => {
  const { setAuthStatus } = useAuth();
  async function _logOut() {
    await userAuth.logOut();
    setAuthStatus(false);
  }
  return (
    <Button
      variant="outline"
      fontWeight={"light"}
      _focus={{ outline: "none", border: "4px solid white" }}
      _hover={{ bg: "teal.400" }}
      size="sm"
      mr={4}
      onClick={_logOut}
    >
      Leave Room
    </Button>
  );
};

export default LogoutPage;
