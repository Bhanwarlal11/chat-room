const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dotenv = require("dotenv");
const cors = require("cors");
const { corsOptions } = require("./config/constant.js");
const { socketAuthenticator } = require("./middlewares/socketAuthenticator.js");
const chatRoutes = require("./routes/chatRoutes");
const { NEW_MESSAGE, NEW_MESSAGE_ALERT } = require("./config/event.js");
const { v4: uuid } = require("uuid");
const Message = require("./models/Message.js");
const { getSockets } = require("./config/features.js");

const userSocketIDs = new Map();

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.set("io", io);

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/chat", chatRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to ChatRoom");
});

// socketAuthenticator & socket cookie parser
io.use((socket, next) => {
  cookieParser()(socket.request, socket.request.res, (err) =>
    socketAuthenticator(err, socket, next)
  );
});

// socket user
io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const user = socket.user;
  userSocketIDs.set(user._id.toString(), socket.id);

  socket.on(NEW_MESSAGE, async ({ chatRoomId, members, message }) => {
    const messageForDb = {
      chatRoomId,
      sender: user._id,
      content: message,
    };

    const messageForRealTime = {
      _id: uuid(),
      content: message,
      sender: {
        _id: user._id,
        name: user.name,
      },
      chatRoomId,
      createdAt: new Date().toISOString(),
    };

    const memberSockets = getSockets(members);
    io.to(memberSockets).emit(NEW_MESSAGE, {
      chatRoomId,
      message: messageForRealTime,
    });

    io.to(memberSockets).emit(NEW_MESSAGE_ALERT, { chatRoomId });

    try {
      await Message.create(messageForDb);
    } catch (err) {
      throw new Error(err);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = { userSocketIDs };
