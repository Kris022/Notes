require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const notes = require("./routes/notes");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/notes", notes);

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to DB.");
    app.listen(port, () =>
      console.log(`Listening on port http://localhost:${port}`)
    );
  })
  .catch((err) => console.log(err));
