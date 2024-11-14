const express = require('express');
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();

//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

//Route 2: Add a new note using: POST "/api/notes/addnotes" login required
router.post('/addnotes', fetchuser, [
    body('title').isLength({ min: 1 }),
    body('description').isLength({ min: 1 })
], async (req, res) => {
    try {
        const { title, description, tag, date, priority } = req.body;

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title,
            description,
            tag,
            date: date || Date.now(),  // If no date is provided, set to current date
            priority: priority || 'medium', // Default priority to 'medium' if not provided
            user: req.user.id
        });

        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

//Route 3: Update a note using: PUT "/api/notes/updatenote/:id" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag, date, priority } = req.body;

        // Create a newNote object
        const newNote = {};

        if (title) newNote.title = title;
        if (description) newNote.description = description;
        if (tag) newNote.tag = tag;
        if (date) newNote.date = date;  // Allow updating the date if necessary
        if (priority) newNote.priority = priority;  // Update priority if provided

        // Find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

//Route 4: Delete a note using: DELETE "/api/notes/deletenote/:id" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found");
        }

        // Allow deletion only if user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
});

module.exports = router;
