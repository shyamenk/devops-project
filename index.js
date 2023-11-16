const express = require("express");
const session = require("express-session");
const RedisStore = require("connect-redis").default;
const { createClient } = require("redis");
const { SESSION_SECRET, REDIS_URL, REDIS_PORT } = require("./config/config.js");
const connectDB = require("./db");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
var cors = require("cors");

const redisClient = createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error(`Error connecting to Redis: ${err}`);
});

const redisStore = new RedisStore({
  client: redisClient,
});

connectDB();
const app = express();
app.use(cors());

app.enable("trust proxy");
const sessionMiddleware = session({
  store: redisStore,
  secret: SESSION_SECRET,
  cookie: {
    secure: false,
    resave: false,
    saveUninitialized: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
});

// app.use(sessionMiddleware);

app.use(express.json());

app.get("/api/v1", (req, res) => {
  console.log("It ran.");
  res.send("<h2>Connected to MongoDB</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
