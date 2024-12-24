import React from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = () => {
  return (
    <Box
      sx={{
        bgcolor: "#f0f0f0",
        p: 2,
        borderRight: "1px solid #ddd",
        height: "100%",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Joined Rooms
      </Typography>
      <List sx={{ mb: 3 }}>
        <ListItem>
          <ListItemText primary="Room 1" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Room 2" />
        </ListItem>
      </List>

      <Typography variant="h6" gutterBottom>
        Created Rooms
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Room 3" />
        </ListItem>
        <ListItem>
          <ListItemText primary="Room 4" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
