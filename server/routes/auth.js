const express = require("express");
const multer = require("multer");
const router = express.Router();
var cookieParser = require("cookie-parser");
router.use(cookieParser());
require("../db/conn");

const user = require("../model/userSchema");
router.get("/", (req, res) => {
  res.send("welcome to home page router");
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${process.cwd()}/Images`);
  },
  filename: function (req, file, cb) {
    // file ka name hum is tarha store karin gay
    console.log("the file name is ", file.originalname);
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

router.get("/register", (req, res) => {
  res.send("welcome to register page router");
});

router.post("/register", upload.single("image"), async (req, res) => {
  try {
    // is se humin image ka new name mil jay ga jo hum ne store karna ha
    const image = req.file.filename;
    console.log("the value is :", req.body);
    const { name, email, phone, password } = req.body;

    const user1 = new user({ name, email, phone, password, image });

    const data = await user1.save();
    if (data) {
      return res.status(200).json({ message: "Data saved succesfuuly" });
    }
  } catch (err) {
    console.log("the error is :", err);
  }
  //   console.log(req.body);
  //   res.json({ message: req.body });
});

module.exports = router;
