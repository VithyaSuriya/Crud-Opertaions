const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = "uploads/";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const userId = req.params.id;
    const ext = path.extname(file.originalname);
    cb(null, userId + ext);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 150 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .jpeg, .png formats are allowed"), false); 
    }
  },
}).single("image");

module.exports = upload;
