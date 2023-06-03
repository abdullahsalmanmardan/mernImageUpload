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
    cb(null, "../Images");
  },
  filename: function (req, file, cb) {
    // file ka name hum is tarha store karin gay
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
    const { name, email, phone, password, image } = req.body;
    let imageName = image.filename;
    console.log(imageName);
    const user1 = new user({ name, email, phone, password, image });

    const data = await user1.save();
    if (data) {
      return res.status(200).json({ message: "Data saved succesfuuly" });
    }
  } catch (err) {
    console.log(err);
  }
  //   console.log(req.body);
  //   res.json({ message: req.body });
});

module.exports = router;
