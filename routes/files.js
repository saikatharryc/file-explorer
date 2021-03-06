const express = require("express");
const multer = require("multer");
const uuid = require("uuid/v4");
const ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();

const config = require("../config");
const uploadCont = require("../controller/uploads");
const fileOpsCont = require("../controller/objectOps");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.FILE_DEST);
  },
  filename: function(req, file, cb) {
    const fileSpilts = file.originalname.split(".");
    const ext = fileSpilts[fileSpilts.length - 1];
    cb(null, uuid() + "." + ext);
  }
});

const upload = multer({ storage: storage }).single("file");

router.post("/", (req, res, next) => {
  return upload(req, res, async err => {
    if (err instanceof multer.MulterError) {
      return next({
        message: "Error while uploading!",
        stack: err,
        status: 400
      });
    } else if (err) {
      return next(err);
    }
    const parent = req.body.parent;

    if (parent && !ObjectId.isValid(parent)) {
      return next({ message: "Please provide valid parent or pass null " });
    }

    if (req.file) {
      const result = await uploadCont.insertFile(req.file, parent);
      return res.json(result);
    } else if (req.body.folderName) {
      const result = await uploadCont.createFolder(req.body.folderName, parent);
      return res.json(result);
    } else {
      return next({ message: "required elements not present in request" });
    }
  });
});

router.get("/", (req, res, next) => {
  const p = req.query.p;
  if (p && !ObjectId.isValid(p)) {
    return next({ message: "Please provide valid parent or pass null" });
  }
  return fileOpsCont
    .getObject(p)
    .then(d => {
      return res.json(d);
    })
    .catch(ex => {
      return next(ex);
    });
});

router.post("/delete", (req, res, next) => {
  return fileOpsCont
    .deleteObject(req.body.o)
    .then(d => {
      return res.json(d);
    })
    .catch(Ex => {
      return next(Ex);
    });
});
module.exports = router;
