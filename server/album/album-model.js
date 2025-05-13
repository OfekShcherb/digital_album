const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
});

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
