const mongoose = require("mongoose");

const mediaItemSchema = new mongoose.Schema({
  type: { type: String, required: true },
  position: {
    x: { type: Number, required: [true, "missing field: position.x"] },
    y: { type: Number, required: [true, "missing field: position.y"] },
  },
  size: {
    width: { type: Number, required: [true, "missing field: size.width"] },
    height: { type: Number, required: [true, "missing field: size.height"] },
  },
  rotation: { type: Number, required: [true, "missing field: rotation"] },
  url: String,
  text: String,
  color: String,
  shapeType: String,
});

const pageSchema = new mongoose.Schema({
  albumID: { type: Number, required: true },
  items: [mediaItemSchema],
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;
