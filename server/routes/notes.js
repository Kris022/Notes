const { Note } = require("../models/note");

const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await Note.find().sort("title");
    if (!result) throw new Error("An error occured while fetching notes.");

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get note by id
router.get("/:id", async (req, res) => {
  try {
    const result = await Note.findById(req.params.id);
    if (!result) throw new Error("An error occured while fetching note.");

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Create a note
router.post("/", async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      description: req.body.description,
    });

    await newNote.save();

    res.status(200).send(newNote);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Update note
router.put("/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
      },
      { new: true }
    );

    if (!result) throw new Error("An error occured while updating the note.");

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id);

    if (!result) throw new Error("An error occured while deleteing note.");

    res.status(200).send(result);
  } catch (err) {
    res.status(400).send({ error: "An error occured while deleting." });
  }
});

module.exports = router;
