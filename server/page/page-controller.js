const mongoose = require("mongoose");
const Page = require("./page-model");
const Album = require("../album/album-model");

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

module.exports = {
  createPage,
};
