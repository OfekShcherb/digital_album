const express = require("express");
const router = express.Router();

const {
  getAlbum,
  createAlbum,
  deleteAlbum,
  updateAlbum,
} = require("./album-controller");

router.get("/:id", getAlbum);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);
router.patch("/:id", updateAlbum);

module.exports = router;
