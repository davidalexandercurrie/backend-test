const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const fs = require("fs");

const fetch = require("node-fetch");

const port = process.env.PORT || 3000;
server.listen(port);

let url = "https://api.npoint.io/27499e1a2dc4c3170144";

let settings = { method: "Get" };

fetch(url, settings)
  .then((res) => res.json())
  .then((json) => {
    // do something with JSON
    app.get("/", (req, res) => {
      res.status(200).json(json);
    });
  });

// app.listen(port, () => console.log("server started on port!", port));

io.on("connection", (socket) => {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", (data) => {
    console.log(data);
  });
});
