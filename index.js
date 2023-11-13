const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("<h2>Docker Hub</h2>");
});

const PORT = process.env.PORT || 3000;

app.listen(3000, () => console.log(`Server listening on port ${PORT}`));
