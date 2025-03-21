// import React, { createContext, useMemo, useContext } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//   const socket = useContext(SocketContext);
//   return socket;
// };

// export const SocketProvider = (props) => {
//   const socket = useMemo(() => io("localhost:5555"), []);

//   // const socket = useMemo(() => io("https://doctorconsbackend.onrender.com"), []);

//   return (
//     <SocketContext.Provider value={socket}>
//       {props.children}
//     </SocketContext.Provider>
//   );
// };


// SocketProvider.jsx
import React, { createContext, useMemo, useContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props) => {
  // const socket = useMemo(() => io("http://localhost:5555"), []); 
  
  const socket = io("http://localhost:5555", {
    transports: ["websocket"], // Force WebSocket instead of HTTP polling
});

  return (
    <SocketContext.Provider value={socket}>
      {props.children}
    </SocketContext.Provider>
  );
};