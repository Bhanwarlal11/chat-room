// get messages

// get all rooms

// create room

// get joined room

//  join to room

// delete group & delete chat of this group

const { REFETCH_CHATS, ALERT } = require("../config/event");
const { emitEvent } = require("../config/features");
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");

// Get all messages in a chat room
const getMessages = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await Message.find({ chatRoomId }).populate(
      "sender",
      "name email"
    );
    res.status(200).json({ success: true, messages: messages.reverse() });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch messages", error });
  }
};

// Get all chat rooms
const getAllRooms = async (req, res) => {
  try {
    const rooms = await ChatRoom.find().populate("participants", "name email");
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch chat rooms", error });
  }
};

// Create a new chat room
const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name are required",
      });
    }

    const newRoom = new ChatRoom({ name });
    await newRoom.save();

    res.status(201).json({ success: true, room: newRoom });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create room", error });
  }
};

// Get all rooms a user has joined
const getJoinedRooms = async (req, res) => {
  try {
    const userId = req.user; // Assuming req.user is populated with authenticated user
    const rooms = await ChatRoom.find({ participants: userId });
    res.status(200).json({ success: true, rooms });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch joined rooms", error });
  }
};

// Join a room
const joinRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const userId = req.user; // Assuming req.user is populated with authenticated user

    const room = await ChatRoom.findById(chatRoomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    if (room.participants.includes(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Already a participant" });
    }

    room.participants.push(userId);
    await room.save();

    emitEvent(req, ALERT, room.participants, "new user joined the group");
    emitEvent(req, REFETCH_CHATS, room.participants);

    res.status(200).json({ success: true, room });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to join room", error });
  }
};

// Delete a chat room and its messages
const deleteRoom = async (req, res) => {
  try {
    const { chatRoomId } = req.params;

    const room = await ChatRoom.findById(chatRoomId);
    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    // Delete messages related to the room
    await Message.deleteMany({ chatRoomId });
    await room.remove();

    res
      .status(200)
      .json({ success: true, message: "Room and its messages deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete room", error });
  }
};

// Get available chat rooms (rooms where the user is not a participant)
const getAvailableRooms = async (req, res) => {
  try {
    const userId = req.user; // Assuming req.user is populated with authenticated user

    // Fetch all chat rooms
    const rooms = await ChatRoom.find();

    // Filter rooms to return only those where the user is not a participant
    const availableRooms = rooms.filter(
      (room) => !room.participants.includes(userId)
    );

    res.status(200).json({ success: true, rooms: availableRooms });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch available rooms",
      error,
    });
  }
};

module.exports = {
  getMessages,
  getAllRooms,
  createRoom,
  getJoinedRooms,
  joinRoom,
  deleteRoom,
  getAvailableRooms,
};
