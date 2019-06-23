const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const objectSchema = mongoose.Schema(
  {
    object_name: {
      type: String,
      required: true
    },
    is_file: {
      type: Boolean,
      required: true
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Objects",
      default: null
    },
    all_parents: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Objects"
      }
    ],
    following_childs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Objects"
      }
    ],
    file_name: {
      type: String
    },
    file_path: {
      type: String
    },
    mimetype: {
      type: String
    },
    size: {
      type: Number
    }
  },
  {
    timestamp: true
  }
);
objectSchema.post("remove", (doc, next) => {
  if (doc.file_path) {
    fs.unlinkSync(doc.file_path);
    next();
  } else {
    console.log("Nothing to remove!");
    next();
  }
});
const Objects = mongoose.model("Objects", objectSchema);

module.exports = Objects;
