import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Messages = ({ messages }) => {
  return (
    <Paper
      elevation={2}
      sx={{
        flexGrow: 1,
        overflowY: "auto",
        mb: 2,
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {messages.map((message) => (
        <Box key={message.id} sx={{ mb: 2, textAlign: message.sender === "you" ? "right" : "left" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {message.sender === "you" ? "You" : message.sender}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            {message.content}
          </Typography>
          <Typography variant="caption">
            {new Date(message.timestamp).toLocaleTimeString()}
          </Typography>
        </Box>
      ))}
    </Paper>
  );
};

export default Messages;
