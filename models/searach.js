// File: backend/models/searchModel.js
const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema(
  {
    // --- YEH NAYA FIELD SAB SE AHEM HAI ---
    firebaseUid: {
      type: String,
      required: true, // User ki ID ke bina record save nahi hoga
    },
    term: { type: String, required: true },
    query: { type: String },
    previousResults: [{ type: mongoose.Schema.Types.Mixed }],
    newResults: [{ type: mongoose.Schema.Types.Mixed }],
  },
  {
    timestamps: true, // Yeh 'createdAt' aur 'updatedAt' khud add kar dega
  }
);

module.exports = mongoose.model("Search", searchSchema);
