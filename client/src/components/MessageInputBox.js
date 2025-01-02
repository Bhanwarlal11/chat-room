import React, { useState } from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useSocket } from "../socket.js"; // Import the useSocket hook

const MessageInputBox = ({ chatRoomId, members }) => {
  const [message, setMessage] = useState("");
  const socket = useSocket(); // Access the socket instance

  // Handle message input change
  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  // Handle send message
  const handleSendMessage = () => {
    if (message.trim()) {
      // Emit the NEW_MESSAGE event to the server
      socket.emit("NEW_MESSAGE", {
        chatRoomId,
        members,
        message,
      });
      setMessage(""); // Clear the input after sending
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        sx={{ mr: 2 }}
      />
      <IconButton color="primary" onClick={handleSendMessage}>
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInputBox;
