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

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
