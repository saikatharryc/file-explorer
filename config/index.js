module.exports = {
  MONGO: {
    URI: process.env.MONGO_URI || "mongodb://localhost:27000",
    OPTIONS: {
      useNewUrlParser: true
    }
  },
  FILE_DEST: "files"
};
