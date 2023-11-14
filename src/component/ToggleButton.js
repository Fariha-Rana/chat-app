"use client"
import {
    VStack,
    IconButton,
    useColorMode,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { BsSun, BsMoon } from "react-icons/bs";

  function Toggle() {
    const { toggleColorMode } = useColorMode();
    return (
      <VStack>
        <IconButton
          aria-label="Mode Change"
          variant="outline"
          colorScheme="black"
          size="lg"
          icon={useColorModeValue(<BsMoon />, <BsSun />)}
          onClick={toggleColorMode}
        />
      </VStack>
    );
  }
  
  export default Toggle;
  