import React from "react";
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

function PlayerListRow(props: any) {
  const { logo, name, status } = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  return (
    <Tr>
      <Td pl="0px">
        <Flex align="center" minWidth="100%" flexWrap="nowrap">
          <Avatar src={logo} w="25px" h="25px" borderRadius="full" me="18px" />
          <Text
            fontSize="sm"
            color={textColor}
            fontWeight="bold"
            minWidth="100%"
          >
            {name}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status === "Ready" ? "green.400" : bgStatus}
          color={status === "Ready" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {status}
        </Badge>
      </Td>
    </Tr>
  );
}

export default PlayerListRow;
