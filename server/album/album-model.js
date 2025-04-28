const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
});

albumSchema.plugin(mongooseSequence(mongoose), { inc_field: "albumID" });

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;
