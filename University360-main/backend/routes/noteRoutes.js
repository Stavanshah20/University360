const express = require('express');
const { getNotes, createNote, getNoteById, UpdateNote, DeleteNote } = require('../controllers/noteController.js');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware.js');


router.route("/").get(getNotes);
router.route("/create").post(protect, createNote);
router.route("/:id").get(getNoteById).put(protect, UpdateNote).delete(protect, DeleteNote);

module.exports = router;