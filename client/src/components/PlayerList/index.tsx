import { BoxProps, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IUser } from "../../interfaces/IUser";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardHeader from "../Card/CardHeader";
import PlayerTable from "./components/PlayerTable";

function PlayerList({ players, ...props }: BoxProps & { players: IUser[] }) {
  const noOfReadyPlayers = React.useMemo(() => {
    return players.filter((player) => player.status === "ready").length;
  }, [players]);
  return (
    <Card
      p="16px"
      overflowX={{ sm: "scroll", xl: "hidden" }}
      maxW="25rem"
      boxShadow="lg"
      {...props}
    >
      <CardHeader p="12px 0px 28px 0px">
        <Flex direction="column">
          <Text fontSize="lg" fontWeight="bold" pb=".5rem">
            All Players
          </Text>
          <Flex align="center">
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              <Text fontWeight="bold" as="span">
                {players.length} joined
              </Text>{" "}
              {noOfReadyPlayers} ready.
            </Text>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody pe="0px" mb="31px" position="relative">
        <PlayerTable players={players} />
      </CardBody>
    </Card>
  );
}

export default PlayerList;
