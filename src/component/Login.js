"use client";
import { FormControl, Input, Button, Stack, Center } from "@chakra-ui/react";
import userAuth from "@/appwrite/authentication";
import { useState } from "react";
import useAuth from "@/context/useAuth";
import { PiChatTeardropDots } from "react-icons/pi";

export default function LoginComponent() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthStatus } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (name) {
      try {
        setIsLoading(true);
        let islogin = await userAuth.isLoggedIn();
        if (!islogin) islogin = await userAuth._createAnonymousSession(name);
        if (islogin) setAuthStatus(true);
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false)
      }
    }
  };

  return (
    <Center h="60vh" w="100vw">
      <Stack spacing={4} alignItems={"center"} bgColor={""}>
        <FormControl>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your Name"
            border="1px solid ActiveBorder"
            size="md"
            mb="1"
            isRequired
            maxLength={20}
          />
        </FormControl>
        <Button
          fontSize={"13px"}
          bgColor={"ButtonShadow"}
          rightIcon={<PiChatTeardropDots />}
          border="1px solid ActiveBorder"
          size="sm"
          width={"50%"}
          onClick={handleLogin}
          variant={"outline"}
        >
         {isLoading ? "wait..." :  "Start Chatting" }
        </Button>
      </Stack>
    </Center>
  );
}
