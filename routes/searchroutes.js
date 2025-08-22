// File: backend/routes/searchRoutes.js
const express = require("express");
const Search = require("../models/searach"); // Make sure this path is correct
const router = express.Router();

// --- 1. Save a new search record ---
router.post("/", async (req, res) => {
  try {
    const { firebaseUid, term, query, newResults } = req.body;

    // Minimal validation
    if (!firebaseUid || !term) {
      return res
        .status(400)
        .json({ message: "firebaseUid and term are required." });
    }

    const search = await Search.create({
      firebaseUid,
      term,
      query,
      newResults,
    });

    res.status(201).json(search);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- 2. Get all search history or filter by UID ---
router.get("/", async (req, res) => {
  try {
    const { uid } = req.query;

    const filter = uid ? { firebaseUid: uid } : {};
    const searches = await Search.find(filter);

    res.json(searches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Export the router so Express can use it
module.exports = router;
