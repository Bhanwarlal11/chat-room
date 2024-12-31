// get messages

// get all rooms

// create room 

// get joined room

//  join to room

// delete group & delete chat of this group


const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");

// Get all messages in a chat room
const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoomId }).populate("sender", "name email");
    res.status(200).json({ success: true, messages: messages.reverse() });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch messages", error });
  }
};

// Get all chat rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().populate("participants", "name email");
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch chat rooms", error });
  }
};

// Create a new chat room
const createRoom = async (req, res) => {
  try {
    const { name, participants } = req.body;

    if (!name || !participants) {
      return res.status(400).json({ success: false, message: "Name and participants are required" });
    }

    const newRoom = new ChatRoom({ name, participants });
    await newRoom.save();

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to create room", error });
  }
};

// Get all rooms a user has joined
const getJoinedRooms = async (req, res) => {
  try {
    const { userId } = req.user; // Assuming req.user is populated with authenticated user
    const rooms = await ChatRoom.find({ participants: userId });
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch joined rooms", error });
  }
};

// Join a room
const joinRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { userId } = req.user; // Assuming req.user is populated with authenticated user

    const room = await ChatRoom.findById(chatRoomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (room.participants.includes(userId)) {
      return res.status(400).json({ success: false, message: "Already a participant" });
    }

    room.participants.push(userId);
    await room.save();

    res.status(200).json({ success: true, room });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to join room", error });
  }
};

// Delete a chat room and its messages
const deleteRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const room = await ChatRoom.findById(chatRoomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    // Delete messages related to the room
    await Message.deleteMany({ chatRoomId });
    await room.remove();

    res.status(200).json({ success: true, message: "Room and its messages deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete room", error });
  }
};

module.exports = {
  getMessages,
  getAllRooms,
  createRoom,
  getJoinedRooms,
  joinRoom,
  deleteRoom,
};
