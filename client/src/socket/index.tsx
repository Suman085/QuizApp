import React from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "../consts/config";

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
});

export const SocketContext = React.createContext<Socket | null>(null);
