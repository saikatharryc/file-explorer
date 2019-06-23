const mongoose = require("mongoose");

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
      ref: "Objects"
    },
    file_path: {
      type: String
    }
  },
  {
    timestamp: true
  }
);
const Objects = mongoose.model("Objects", objectSchema);

module.exports = Objects;
