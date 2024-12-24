import React from "react";
import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const MessageInputBox = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Type your message..."
        sx={{ mr: 2 }}
      />
      <IconButton color="primary">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default MessageInputBox;
