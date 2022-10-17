const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const postRouter = require("./routes/postsRoutes");
const catRouter = require("./routes/categoriesRoutes");
const userRouter = require("./routes/userRoutes");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/posts", postRouter);
app.use("/cat", catRouter);
app.use("/images", express.static(path.join(__dirname, "/images")));

app.post("/uploads", upload.single("file"), (req, res) => {
  res.status(200).json({ success: true, msg: "file has been uploaded" });
});

mongoose.connect(process.env.MONGO_URI, () => console.log("connected to DB"));

app.listen(process.env.PORT, () =>
  console.log(`server running on port ${process.env.PORT}`)
);
