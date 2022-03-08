import {
  Flex,
  FlexProps,
  Stack,
  Heading,
  Text,
  Button,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { SocketContext } from "../../socket";
import Card from "../Card/Card";

function QuizBoard({ isReady, ...props }: FlexProps & { isReady: boolean }) {
  const socket = React.useContext(SocketContext);
  const handleReady = React.useCallback(() => {
    socket?.emit("readyForQuiz");
  }, [socket]);
  const handleWait = React.useCallback(() => {
    socket?.emit("waitForQuiz");
  }, [socket]);
  return (
    <Card
      as={Flex}
      boxShadow="lg"
      alignItems={"center"}
      justify="center"
      {...props}
    >
      <Stack spacing={8}>
        <Heading
          color={"gray.800"}
          lineHeight={1.1}
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
        >
          Are you ready
          <Text
            as={"span"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
          >
            ?
          </Text>
        </Heading>
        <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
          Waiting for players to join the quiz. If you find all your friends
          here in the list, Click on the Ready button below to start Rock and
          Roll
        </Text>
        {!isReady && (
          <Button variant={"solid"} colorScheme={"green"} onClick={handleReady}>
            Ready
            <Box as="span" fontWeight="400" px="1.5rem">
              ⟶
            </Box>
          </Button>
        )}
        {isReady && (
          <Button variant={"solid"} colorScheme={"orange"} onClick={handleWait}>
            Wait
            <Box as="span" fontWeight="400" px="1.5rem">
              X
            </Box>
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export default QuizBoard;
