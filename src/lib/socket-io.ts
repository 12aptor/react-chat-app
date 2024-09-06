import { SOCKET_URL } from "@/utils/constants";
import { io } from "socket.io-client";

export const socket = io(SOCKET_URL);
