import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../src/theme";
import { SocketContext, socket } from "../src/socket";
import UserProvider from "../src/providers/UserProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <SocketContext.Provider value={socket}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SocketContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;
