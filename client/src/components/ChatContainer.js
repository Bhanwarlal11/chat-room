




import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Messages from "./Messages";
import MessageInputBox from "./MessageInputBox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const ChatContainer = ({ chatRoomId, roomName, messages }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 2, margin: 2, height: "90%" }}>
      {/* Group Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          borderBottom: "1px solid #ddd",
          pb: 1,
        }}
      >
        <Typography variant="h6">{roomName || "Group Name"}</Typography>
        <Button variant="outlined" startIcon={<ExitToAppIcon />} color="error">
          Exit Group
        </Button>
      </Box>

      {/* Messages */}
      <Messages messages={messages} />

      {/* Typing Indicator */}
      <Typography variant="body2" sx={{ fontStyle: "italic", mb: 1 }}>
        Typing...
      </Typography>

      {/* Input Field */}
      <MessageInputBox />
    </Box>
  );
};

export default ChatContainer;
