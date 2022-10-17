const catRoutes = require("express").Router();
const { createCat, getCat } = require("../controllers/categoryController");

catRoutes.post("/", createCat);
catRoutes.get("/", getCat);

module.exports = catRoutes;
