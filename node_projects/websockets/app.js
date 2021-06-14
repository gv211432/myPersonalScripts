const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Some one is connected..");
  res.send("<h1>Hi Boss what's up!!</h1>");
});
app.listen(80, () => console.log("Server running on port 80 .."));
