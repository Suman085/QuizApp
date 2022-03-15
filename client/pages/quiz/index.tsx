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
  Input,
  useClipboard,
  VStack,
  Editable,
  EditableInput,
  EditablePreview,
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
  const quizId = router.query.quizId as string;
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [timer, setTimer] = React.useState<number>(10);
  const [isComplete, setIsComplete] = React.useState(false);
  const { user: self, clearUser, loginUser, updateUsername } = useUserContext();
  const [value, setValue] = React.useState("");
  const { hasCopied, onCopy } = useClipboard(value);

  React.useEffect(() => {
    setValue(window?.location?.href);
  }, []);
  const isSelfReady = React.useMemo(() => {
    return (
      users.find((user) => user.username === self?.username)?.status === "ready"
    );
  }, [self, users]);

  const isAllReady = React.useMemo(() => {
    const readyUsers = users.filter((user) => user.status === "ready");
    return users.length !== 0 && readyUsers.length === users.length;
  }, [users]);

  React.useEffect(() => {
    socket?.on("onLoggedIn", (user: IUser) => {
      user.quizId = quizId;
      loginUser!(user);
    });
    return () => {
      socket?.off("onLoggedIn");
    };
  }, [loginUser, quizId, socket]);

  React.useEffect(() => {
    socket?.on("allUsers", ({ users }) => {
      setUsers(users ?? []);
      setTimer(10);
    });
    return () => {
      socket?.off("allUsers");
    };
  }, [socket]);

  React.useEffect(() => {
    if (self === undefined && quizId && !isComplete) {
      socket?.emit("login", { quizId });
      setIsComplete(true);
    }
  }, [isComplete, quizId, self, socket]);

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
    socket?.emit("logout", { quizId, username: self?.username });
    clearUser?.();
    Router.replace("/");
  }, [clearUser, quizId, self?.username, socket]);

  const handleSubmit = React.useCallback(
    (value: string) => {
      socket?.emit("updateUsername", { quizId, name: value });
      updateUsername?.(value);
    },
    [quizId, socket, updateUsername]
  );

  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <Box background="radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(0,9,121,1) 11%, rgba(0,212,255,1) 100%)">
      {self && (
        <HStack
          w="100%"
          h={16}
          justifyContent="end"
          alignItems={"center"}
          padding={"1rem"}
          bg={bg}
        >
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar size={"sm"} src={self.avatar} />
            </MenuButton>
            <MenuList>
              <MenuItem>Your Profile</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLeave}>Leave quiz</MenuItem>
            </MenuList>
          </Menu>
          <Editable onSubmit={handleSubmit} defaultValue={self.username}>
            <EditablePreview />
            <EditableInput />
          </Editable>
        </HStack>
      )}
      <HStack justify={"space-between"} p="1rem">
        <Heading>
          {isAllReady && (
            <Box as="span" color={"orange.400"}>
              Starting in {timer}...
            </Box>
          )}
        </Heading>
        <VStack align="end" px="1rem">
          <Text color={"white"}>Copy the link and share with your friends</Text>
          <Flex>
            <Input
              value={value}
              isReadOnly
              placeholder="Welcome"
              color={"white"}
            />
            <Button onClick={onCopy} ml={2}>
              {hasCopied ? "Copied" : "Copy"}
            </Button>
          </Flex>
        </VStack>
      </HStack>

      <HStack p="1rem" spacing="1rem" h="100%">
        <QuizBoard
          flexGrow={1}
          h="100%"
          minH="30rem"
          isReady={isSelfReady}
          quizId={quizId}
        />
        <PlayerList minH="30rem" players={users} />
      </HStack>
    </Box>
  );
}

export default Quiz;
