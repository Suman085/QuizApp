import React from "react";
import type { NextPage } from "next";

import {
  Button,
  Text,
  Input,
  Flex,
  Stack,
  Container,
  Heading,
  useColorModeValue,
  HStack,
  useRadioGroup,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Illustration } from "../src/illustrations/home-illustration";
import RadioCard from "../src/components/Radio";
import Router from "next/router";
import { SocketContext } from "../src/socket";

const options = ["Javascript", "Python", "Dart"];

const Home: NextPage = () => {
  const socket = React.useContext(SocketContext);
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "language",
    defaultValue: "Javascript",
  });

  React.useEffect(() => {
    socket?.on("onQuizCreated", (quiz) => {
      Router.push({ pathname: "/quiz", query: { quizId: quiz.id } });
    });
  }, [socket]);

  const group = getRootProps();

  const handleSubmit = React.useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();

      const target = e.target as typeof e.target & {
        language: { value: string };
      };
      socket?.emit("createQuiz", {
        topic: target.language.value,
      });
    },
    [socket]
  );
  return (
    <Container maxW={"5xl"}>
      <Stack
        textAlign={"center"}
        align={"center"}
        spacing={{ base: 4, md: 8 }}
        py={{ base: 15, md: 20 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
          lineHeight={"110%"}
        >
          Want a quiz?{" "}
          <Text as={"span"} color={"orange.400"}>
            Challenge your friends
          </Text>
        </Heading>
        <Text color={"gray.500"} maxW={"3xl"}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>

        <Stack as="form" onSubmit={handleSubmit} spacing={8}>
          <Stack
            as={FormControl}
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="center"
            {...group}
          >
            <FormLabel fontSize="1.2rem">Choose Topic: </FormLabel>
            <HStack>
              {options.map((value) => {
                const radio = getRadioProps({ value });
                return (
                  <RadioCard key={value} {...radio}>
                    {value}
                  </RadioCard>
                );
              })}
            </HStack>
          </Stack>
          <Stack
            spacing={4}
            direction={{ base: "column", md: "row" }}
            w={"full"}
          >
            <Button
              bg={"blue.400"}
              rounded={"full"}
              color={"white"}
              flex={"1 0 auto"}
              type="submit"
              _hover={{ bg: "blue.500" }}
              _focus={{ bg: "blue.500" }}
            >
              Enter Quiz
            </Button>
          </Stack>
        </Stack>
        <Flex w={"full"}>
          <Illustration
            height={{ sm: "20", lg: "24rem" }}
            mt={{ base: 12, sm: 16 }}
          />
        </Flex>
      </Stack>
    </Container>
  );
};

export default Home;
