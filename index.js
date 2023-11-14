const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://root:example@mongo:27017/?authSource=admin")
  .then(() =>
    console.log("Succsesfully connected to MongoDB Databaseon PORT: 27017")
  )
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Dockerdwdef Hub</h2>");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server listening on port ${PORT}`));
