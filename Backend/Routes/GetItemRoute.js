const express = require("express");
const get_item_router = express.Router();
const GetItemController = require("../Controllers/GetItemController");


get_item_router.post("/", GetItemController.addGetItem);
get_item_router.get("/", GetItemController.getAllGetItems);

module.exports = get_item_router;