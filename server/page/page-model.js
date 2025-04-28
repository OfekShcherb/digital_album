const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  albumID: { type: Number, required: true },
  items: [{ type: String, enum: ["image", "video", "audio", "note", "shape"] }],
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
