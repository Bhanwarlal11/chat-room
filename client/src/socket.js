import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { API_URL } from "./config/constants";


const SocketContext = createContext();

const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(API_URL, { withCredentials: true ,transports: ["websocket"]}), []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };