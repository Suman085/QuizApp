import React from "react";
import {
  Table,
  Th,
  Thead,
  Tr,
  Tbody,
  useColorModeValue,
} from "@chakra-ui/react";
import PlayerListRow from "./PlayerListRow";
import { IUser } from "../../../interfaces/IUser";

function PlayerTable(props: { players: IUser[] }) {
  const textColor = useColorModeValue("gray.700", "white");

  return (
    <Table variant="simple" color={textColor}>
      <Thead>
        <Tr my=".8rem" pl="0px" color="gray.400">
          <Th pl="0px" color="gray.400">
            Player name
          </Th>
          <Th color="gray.400">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.players?.map((row) => {
          return (
            <PlayerListRow
              key={row.username}
              name={row.username}
              logo={row.avatar}
              status={row.status}
            />
          );
        })}
      </Tbody>
    </Table>
  );
}

export default PlayerTable;
