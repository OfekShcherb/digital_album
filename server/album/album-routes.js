const express = require("express");
const router = express.Router();

const { getAlbum, createAlbum, deleteAlbum } = require("./album-controller");

router.get("/:id", getAlbum);
router.post("/", createAlbum);
router.delete("/:id", deleteAlbum);

module.exports = router;
