const express = require("express");
const connectDB = require("./db");
const app = express();

// app.use(
//   session({
//     secret: "gfesghhyht",
//     resave: false,
//     saveUninitialized: true,
//   })
// );
const postRouter = require("./routes/postRoutes.js");
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(express.json());

app.get("/api/v1", (req, res) => {
  res.send("<h2>Connected to MongoDB</h2>");
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
