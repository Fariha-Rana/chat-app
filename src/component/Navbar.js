"use client";
import useAuth from "@/context/useAuth";
import { PiHandWavingFill } from "react-icons/pi";
import { Spacer, Flex, Text } from "@chakra-ui/react";
import Toggle from "./ToggleButton";
import userAuth from "@/appwrite/authentication";
import { useState, useEffect } from "react";
import LogoutPage from "./Logout";

export default function Navbar() {
  const [name, setName] = useState("");
  const { authStatus } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let data = await userAuth.getCurrentUser();
        setName(data.name);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (authStatus) {
      fetchUserData();
    }
    if (!authStatus) setName("");
  }, [authStatus]);

  return (
    <Flex p={4} align="center" position={"sticky"} bgColor={"teal.300"}>
      {name ? (
        <Flex align="center" marginLeft={{ base: "20px", md: "30px" }}>
          <Text pr={2}>Hii, {name}</Text>
          <i>
            <PiHandWavingFill />
          </i>
        </Flex>
      ) : <Flex align="center" marginLeft={{ base: "20px", md: "30px" }}>
          <Text pr={2}>Hii, there!</Text>
          <i>
            <PiHandWavingFill />
          </i>
        </Flex> }
      <Spacer />
      {authStatus && (
        <>
          <LogoutPage>Leave Room</LogoutPage>
        </>
      )}
      <Toggle />
    </Flex>
  );
}
