import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { getAvailableRooms, getJoinedRooms } from "../api/api.js";

const Sidebar = ({ rooms }) => {
  const [joinedRooms, setJoinedRooms] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchJoinedRooms = async () => {
      try {
        const response = await getJoinedRooms();
        setJoinedRooms(response.data.rooms);
      } catch (error) {
        console.error("Error fetching joined rooms:", error);
      }
    };

    const fetchAvailableRooms = async () => {
      try {
        const response = await getAvailableRooms();
        setAvailableRooms(response.data.rooms); // assuming the response has the 'rooms' data
      } catch (error) {
        console.error("Error fetching available rooms:", error);
      }
    };

    fetchJoinedRooms();
    fetchAvailableRooms();
  }, []);

  // console.log(joinedRooms)
  // console.log(availableRooms)

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
        {joinedRooms.length === 0 ? (
          <ListItem>
            <ListItemText primary="No joined rooms" />
          </ListItem>
        ) : (
          joinedRooms.map((room) => (
            <ListItem key={room._id} component={Link} to={`/chat/${room.id}`}>
              <ListItemText primary={room.name} />
            </ListItem>
          ))
        )}
      </List>

      <Typography variant="h6" gutterBottom>
        Available Rooms
      </Typography>
      <List sx={{ mb: 3 }}>
        {availableRooms.length === 0 ? (
          <ListItem>
            <ListItemText primary="No available rooms" />
          </ListItem>
        ) : (
          availableRooms.map((room) => (
            <ListItem key={room._id} component={Link} to={`/chat/${room.id}`}>
              <ListItemText primary={room.name} />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
