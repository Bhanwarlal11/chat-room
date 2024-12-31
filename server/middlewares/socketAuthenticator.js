const jwt = require("jsonwebtoken");

const socketAuthenticator = (err, socket, next) => {
  if (err) return next(err);
  const token = socket.request.cookies.token;
  console.log("token fromm socketAuthenticator: ", token);

  if (!token) {
    return next(new Error("socket Authentication error: Token missing"));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.user = decoded._id;
    console.log("socketAuthenticator middleware verified");
    next();
  } catch (error) {
    return next(new Error("Authentication error: Invalid token"));
  }
};

module.exports = { socketAuthenticator };
