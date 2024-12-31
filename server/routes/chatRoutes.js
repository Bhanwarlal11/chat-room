const express = require("express");
const { authenticateJWT } = require("../middlewares/authMiddleware.js");
const {
  getMessages,
  getAllRooms,
  createRoom,
  getJoinedRooms,
  joinRoom,
  deleteRoom,
} = require("../controllers/chatController.js");

const router = express.Router();

// Get messages from a room
router.get("/messages/:chatRoomId", authenticateJWT, getMessages);

// Get all rooms
router.get("/rooms", authenticateJWT, getAllRooms);

// Create a room
router.post("/rooms", authenticateJWT, createRoom);

// Get joined rooms
router.get("/joined-rooms", authenticateJWT, getJoinedRooms);

// Join a room
router.post("/rooms/:chatRoomId/join", authenticateJWT, joinRoom);

// Delete a room and its messages
router.delete("/rooms/:chatRoomId", authenticateJWT, deleteRoom);

module.exports = router;
