const express = require("express");
const app = express();
const fs = require("fs");

const fetch = require("node-fetch");

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

app.listen(3000, () => console.log("server started!"));
