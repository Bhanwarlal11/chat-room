const corsOptions = {
  origin: "http://localhost:3000" || process.env.CLIENT_URL,
  credentials: true,
};

module.exports = { corsOptions };
