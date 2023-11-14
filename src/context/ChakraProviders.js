"use client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";

export function ChakraProviders({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme} >
      <ColorModeScript initialColorMode={theme.initialColorMode}/>
      {children}
      </ChakraProvider>
    </CacheProvider>
  );
}
