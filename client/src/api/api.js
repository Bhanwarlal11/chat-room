import axios from "axios";
import { API_URL } from "../config/constants";



const api = axios.create({
  baseURL: API_URL || process.env.REACT_APP_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
  credentials: "include"
});

export const registerUser = (name, email, password) =>
  api.post("/auth/register", { name, email, password });

export const loginUser = (email, password) =>
  api.post("/auth/login", { email, password });

export const logoutUser = () => api.post("/auth/logout");

export const getMyProfile  = ()=> api.get('/auth/profile');


// Get all messages in a chat room
export const getMessages = (chatRoomId) => 
  api.get(`/messages/${chatRoomId}`);

// Get all chat rooms
export const getAllRooms = () => 
  api.get(`/rooms`);

// Create a new chat room
export const createRoom = (name) => 
  api.post(`/rooms`, { name });

// Get all rooms a user has joined
export const getJoinedRooms = () => 
  api.get(`/joined-rooms`);

// Join a room
export const joinRoom = (chatRoomId) => 
  api.post(`/rooms/${chatRoomId}/join`);

// Delete a room and its messages
export const deleteRoom = (chatRoomId) => 
  api.delete(`/rooms/${chatRoomId}`);



export default api;
