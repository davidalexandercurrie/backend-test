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

setInterval(fetchData, 6000);
// fetch(url, settings)
//   .then((res) => res.json())
//   .then((json) => {
//     // do something with JSON

//   });
function fetchData() {
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      // ... do something with your json ...
      app.get("/", (req, res) => {
        res.status(200).json(json);
      });
      setTimeout(update, 1000); // <-- now that this call is done,
      //     we can program the next one
    })
    .catch(function (err) {
      // Error :(
      setTimeout(update, 1000); // <-- there was a network problem,
      //     but still, program the next one!
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
