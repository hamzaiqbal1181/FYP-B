// // File: backend/routes/searchRoutes.js
// const express = require("express");
// const Search = require("../models/searach"); // keep this if your file is still named 'searach.js'
// const router = express.Router();

// // --- 1. Save a new search record ---
// router.post("/", async (req, res) => {
//   try {
//     const { firebaseUid, term, query, newResults } = req.body;

//     if (!firebaseUid || !term) {
//       return res
//         .status(400)
//         .json({ message: "firebaseUid and term are required." });
//     }

//     // Create new search record
//     const search = await Search.create({
//       firebaseUid,
//       term,
//       query,
//       newResults,
//     });

//     res.status(201).json(search);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // --- 2. Get search history for a specific user only ---
// router.get("/", async (req, res) => {
//   try {
//     const { uid } = req.query;

//     if (!uid) {
//       return res.status(400).json({ message: "uid query param is required" });
//     }

//     // Fetch only searches for that Firebase UID
//     const searches = await Search.find({ firebaseUid: uid }).sort({
//       createdAt: -1,
//     });

//     res.json(searches);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

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
