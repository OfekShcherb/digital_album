const express = require("express");
const router = express.Router();

const { createPage, addItem } = require("./page-controller");

router.post("/", createPage);
router.post("/:pageID/items", addItem);

module.exports = router;
