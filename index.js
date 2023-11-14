const express = require("express");
const connectDB = require("./db");
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("<h2>Connected to MongoDB</h2>");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server listening on port ${PORT}`));
