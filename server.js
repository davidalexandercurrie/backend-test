const express = require("express");
const app = express();
var cors = require("cors");

const server = require("http").Server(app);
const io = require("socket.io")(server);
const fs = require("fs");
app.use(cors());
const fetch = require("node-fetch");
let jsonData;
const port = process.env.PORT || 3000;
server.listen(port);

let url = "https://api.npoint.io/015816899430ca500cf1";

let settings = { method: "Get" };

setInterval(fetchData, 600000);
fetch(url, settings)
  .then((res) => res.json())
  .then((json) => {
    // do something with JSON

    app.get("/", (req, res) => {
      res.status(200).json(json);
    });
  });
function fetchData() {
  fetch(url, settings)
    .then((res) => res.json())
    .then((json) => {
      // do something with JSON
      app.get("/", (req, res) => {
        res.status(200).json(json);
      });
    });
}

// app.listen(port, () => console.log("server started on port!", port));

var clients = 0;

io.on("connection", function (socket) {
  let total = io.engine.clientsCount;
  io.sockets.emit("broadcast", total);
  socket.on("disconnect", function () {
    total = io.engine.clientsCount;
    io.sockets.emit("broadcast", total);
  });
});
