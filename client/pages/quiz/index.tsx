import React from "react";
import {
  Flex,
  Box,
  HStack,
  MenuButton,
  Button,
  Avatar,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Heading,
  useColorModeValue,
  useBreakpointValue,
  FlexboxProps,
  ResponsiveValue,
} from "@chakra-ui/react";
import QuizBoard from "../../src/components/QuizBoard";
import PlayerList from "../../src/components/PlayerList";
import { SocketContext } from "../../src/socket";
import Router, { useRouter } from "next/router";
import { IUser } from "../../src/interfaces/IUser";
import { useUserContext } from "../../src/providers/UserProvider";

function Quiz() {
  const socket = React.useContext(SocketContext);
  const router = useRouter();
  const { language } = router.query;
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [timer, setTimer] = React.useState<number>(10);
  const { user: self, clearUser } = useUserContext();

  const isSelfReady = React.useMemo(() => {
    const isReady =
      users.find((user) => user.username === self?.username)?.status ===
      "Ready";
    return isReady;
  }, [self, users]);

  const isAllReady = React.useMemo(() => {
    const readyUsers = users.filter((user) => user.status === "Ready");
    return users.length !== 0 && readyUsers.length === users.length;
  }, [users]);

  React.useEffect(() => {
    socket?.on("allUsers", ({ users }) => {
      setUsers(users);
      setTimer(10);
    });
    socket?.emit("loadUsers");
    return () => {
      socket?.off("allUsers");
    };
  }, [socket]);

  React.useEffect(() => {
    let interval: any;
    if (isAllReady) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [socket, isAllReady]);

  const handleLeave = React.useCallback(() => {
    socket?.emit("logout");
    clearUser?.();
    Router.replace("/");
  }, [clearUser, socket]);
  return (
    <Box background="radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 11%, rgba(0,212,255,1) 100%)">
      <Flex
        w="100%"
        h={16}
        justifyContent="end"
        alignItems={"center"}
        padding={"1rem"}
        bg={useColorModeValue("gray.100", "gray.900")}
      >
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <HStack align="center">
              <Avatar size={"sm"} src={self?.avatar} />
              <Text>{self?.username}</Text>
            </HStack>
          </MenuButton>
          <MenuList>
            <MenuItem>Your Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLeave}>Leave quiz</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Heading p="1rem">
        Quiz-{language}{" "}
        {isAllReady && (
          <Box as="span" color={"orange.400"}>
            Starting in {timer}...
          </Box>
        )}
      </Heading>
      <HStack p="1rem" spacing="1rem" h="100%">
        <QuizBoard flexGrow={1} h="100%" minH="30rem" isReady={isSelfReady} />
        <PlayerList minH="30rem" players={users} />
      </HStack>
    </Box>
  );
}

export default Quiz;
