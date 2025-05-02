const express = require("express");
const router = express.Router();

const {
  createPage,
  addItem,
  updateItem,
  deleteItem,
} = require("./page-controller");

router.post("/", createPage);
router.post("/:pageID/items", addItem);
router.patch("/:pageID/items/:itemID", updateItem);
router.delete("/:pageID/items/:itemID", deleteItem);

module.exports = router;
