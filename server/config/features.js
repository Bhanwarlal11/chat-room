const { userSocketIDs } = require("../server.js");

const emitEvent = (req, event, users, data) => {
  const io = req.app.get("io");
  const userSocket = getSockets(users);
  io.to(userSocket).emit(event, data);
};

// getSockets

const getSockets = (users = []) => {
  const sockets = users.map((user) => userSocketIDs.get(user.toString()));

  return sockets;
};

module.exports = { emitEvent,getSockets };
