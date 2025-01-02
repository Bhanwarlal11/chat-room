// import React from "react";
// import { Box, Grid, Typography } from "@mui/material";
// import Sidebar from "../components/Sidebar";
// import ChatContainer from "../components/ChatContainer";
// import Navbar from "../components/Navbar";
// import { useParams } from "react-router-dom";

// const ChatRoom = () => {

//   const { chatRoomId } = useParams();

//   return (
//     <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
//       <Navbar />
//       <Grid container sx={{ flexGrow: 1, overflow: "hidden" }}>
//         {/* Sidebar */}
//         <Grid item xs={12} sm={4} md={3}>
//           <Sidebar />
//         </Grid>

//         {/* Chat Area */}
//         <Grid item xs={12} sm={8} md={9}>
//           {/* <ChatContainer /> */}

//           {chatRoomId ? (
//             // Show ChatContainer if a room is selected
//             <ChatContainer chatRoomId={chatRoomId} />
//           ) : (
//             // Show a message if no room is selected
//             <Typography variant="h6" sx={{ color: "#777" }}>
//               Select a room to start chatting.
//             </Typography>
//           )}
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ChatRoom;



import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import chatData from "../data/chatData.json"; // Import your JSON data

const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Simulate fetching rooms and messages
    setRooms(chatData.rooms);
    if (chatRoomId) {
      setMessages(chatData.messages[chatRoomId] || []);
    }
  }, [chatRoomId]);

  const currentRoom = rooms.find((room) => room.id === chatRoomId);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Grid container sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Sidebar rooms={rooms} />
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} sm={8} md={9}>
          {chatRoomId ? (
            <ChatContainer
              chatRoomId={chatRoomId}
              roomName={currentRoom?.name}
              messages={messages}
            />
          ) : (
            <Typography variant="h6" sx={{ color: "#777" }}>
              Select a room to start chatting.
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatRoom;
