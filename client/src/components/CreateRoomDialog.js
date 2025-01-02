import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { createRoom } from "../api/api.js"; // Assuming you have an API function to create rooms

const CreateRoomDialog = ({ open, onClose }) => {
  const [roomName, setRoomName] = useState(""); // State to manage room name input

  // Handle room name change
  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  // Handle room creation
  const handleCreateRoom = async () => {
    try {
      // Assuming `createRoom` is an API function that sends the request to the backend
      const response = await createRoom(roomName);
      if (response.data.success) {
        alert("Room created successfully!");
        onClose(); // Close dialog after successful creation
      } else {
        alert("Failed to create room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
      alert("Error creating room");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Room</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Room Name"
          type="text"
          fullWidth
          value={roomName}
          onChange={handleRoomNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreateRoom} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateRoomDialog;
