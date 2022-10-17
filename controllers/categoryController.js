const categoryModel = require("../models/Category");

const createCat = async (req, res) => {
  const newCat = new categoryModel(req.body);
  try {
    await newCat.save();
    res.status(200).json({ success: true, msg: newCat });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCat = async (req, res) => {
  const categories = await categoryModel.find({});
  try {
    res.status(200).json({ success: true, msg: categories });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { createCat, getCat };
