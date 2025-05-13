const mongoose = require("mongoose");
const Album = require("./album-model");
const Page = require("../page/page-model");
const { validateDataForAlbum } = require("../validators/album-validator");

const getAlbum = async (req, res) => {
  const { id } = req.params;
  await Album.findById(id)
    .then(async (album) => {
      if (!album) {
        res.status(404).json({ success: false, msg: "Album not found" });
      } else {
        album.pages = await Promise.all(
          album.pages.map((id) => Page.findById(id).select("items"))
        );

        res.status(200).json({ success: true, data: album });
      }
    })
    .catch((err) =>
      res.status(500).json({ success: false, msg: "Internal Server Error" })
    );
};

const createAlbum = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide title value!" });
  }

  await Album.create({ title: title, pages: [] })
    .then((newAlbum) => {
      res.status(201).json({ success: true, title: title, id: newAlbum._id });
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    });
};

const deleteAlbum = async (req, res) => {
  const session = await mongoose.startSession();
  const { id } = req.params;
  const albumToDelete = await Album.findOne({ _id: id });
  if (!albumToDelete) {
    return res.status(404).json({ success: false, msg: "Album not found" });
  }
  try {
    const albumToDeleteID = albumToDelete._id;
    await session.withTransaction(async () => {
      await Page.deleteMany({ _id: { $in: albumToDelete.pages } });
      await albumToDelete.deleteOne();
      res.status(200).json({ success: true, id: albumToDeleteID });
    });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  } finally {
    session.endSession();
  }
};

const updateAlbum = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const albumToUpdate = await Album.findById(id);
  if (!albumToUpdate) {
    return res.status(404).json({ success: false, msg: "Album not found" });
  }

  const error = validateDataForAlbum(updatedData);
  if (error) {
    return res.status(400).json({ success: false, msg: error });
  }

  const [key, value] = Object.entries(updatedData)[0];
  albumToUpdate[key] = value;

  albumToUpdate
    .save()
    .then(() => res.status(200).json({ success: true, album: albumToUpdate }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        const error = Object.values(err.errors)[0].message;
        return res.status(400).json({ success: false, msg: error });
      }
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    });
};

module.exports = {
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
};
