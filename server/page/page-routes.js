const express = require("express");
const router = express.Router();

const { createPage, addItem, updateItem } = require("./page-controller");

router.post("/", createPage);
router.post("/:pageID/items", addItem);
router.patch("/:pageID/items/:itemID", updateItem);

module.exports = router;
