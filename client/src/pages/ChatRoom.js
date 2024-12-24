import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import Navbar from "../components/Navbar";

const ChatRoom = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Grid container sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Grid item xs={12} sm={4} md={3}>
          <Sidebar />
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} sm={8} md={9}>
          <ChatContainer />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatRoom;
