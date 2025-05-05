const Album = require("./album-model");
const Page = require("../page/page-model");

const getAlbum = async (req, res) => {
  const { id } = req.params;
  await Album.findOne({ albumID: id })
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
      res
        .status(201)
        .json({ success: true, title: title, id: newAlbum.albumID });
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: "Internal Server Error" });
    });
};

module.exports = {
  getAlbum,
  createAlbum,
};
