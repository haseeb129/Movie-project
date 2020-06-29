const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileFilter = async (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 * 8 },
  fileFilter: fileFilter,
});

async function removeImagefile(path) {
  var dot = ".";
  var locate = path.search("/uploads");
  var address = path.substring(locate, path.length);
  address = dot.concat(address);
  try {
    fs.unlinkSync(address);
    console.log("File Removed");
  } catch (err) {
    console.error(err);
  }
}
module.exports.removeImagefile = removeImagefile;
module.exports.upload = upload;
