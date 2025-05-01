const mongoose = require("mongoose");
const Page = require("./page-model");
const Album = require("../album/album-model");
const { validateItem } = require("../validators/item-validator");

const createPage = async (req, res) => {
  const session = await mongoose.startSession();
  const { albumID } = req.body;

  if (!albumID) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide album id!" });
  }
  try {
    await session.withTransaction(async () => {
      const [newPage] = await Page.create([{ albumID: albumID, items: [] }], {
        session,
      });
      const updatedAlbum = await Album.findOneAndUpdate(
        { albumID: albumID },
        { $push: { pages: newPage._id } },
        { new: true, session }
      );
      if (!updatedAlbum) {
        const error = new Error("Album not found");
        error.statusCode = 404;
        throw error;
      }

      res.status(201).json({
        success: true,
        albumID: albumID,
        page: updatedAlbum.pages.length,
      });
    });
  } catch (err) {
    const status = err.statusCode || 500;

    res
      .status(status)
      .json({ success: false, msg: err.message || "Internal Server Error" });
  } finally {
    session.endSession();
  }
};

const addItem = async (req, res) => {
  const { pageID } = req.params;
  const newItem = req.body;

  const error = validateItem(newItem);

  if (error) {
    return res.status(400).json({ success: false, msg: error });
  }

  try {
    const updatedPage = await Page.findByIdAndUpdate(
      pageID,
      { $push: { items: newItem } },
      { runValidators: true, new: true }
    );

    if (!updatedPage) {
      return res.status(404).json({ success: false, msg: "Page not found" });
    }

    res
      .status(201)
      .json({ success: true, msg: "Item added successfully", item: newItem });
  } catch (err) {
    if (err.name === "ValidationError") {
      const error = Object.values(err.errors)[0].message;
      return res.status(400).json({ success: false, msg: error });
    }
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};
module.exports = {
  createPage,
  addItem,
};
