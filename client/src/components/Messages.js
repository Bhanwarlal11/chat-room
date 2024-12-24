import React from "react";
import { Box, Typography, Paper } from "@mui/material";

const Messages = () => {
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
      <Box sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Username
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Message text
        </Typography>
        <Typography variant="caption">10:30 AM</Typography>
      </Box>
      <Box sx={{ textAlign: "right", mb: 2 }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          You
        </Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          Your message text
        </Typography>
        <Typography variant="caption">10:32 AM</Typography>
      </Box>
    </Paper>
  );
};

export default Messages;
