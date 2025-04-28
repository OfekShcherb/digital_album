const express = require("express");
const router = express.Router();

const { createPage } = require("./page-controller");

router.post("/", createPage);

module.exports = router;
