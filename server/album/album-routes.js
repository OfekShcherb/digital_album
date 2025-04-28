const express = require("express");
const router = express.Router();

const { getAlbum, createAlbum } = require("./album-controller");

router.get("/:id", getAlbum);
router.post("/", createAlbum);

module.exports = router;
