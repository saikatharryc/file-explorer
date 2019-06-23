const ObjectsStore = require("../models/Resource_objects");

const createFolder = async (folderName, parent) => {
  let all_parents = [];
  if (parent) {
    const objectData = await ObjectsStore.findOne({ _id: parent })
      .select("all_parents")
      .exec();
    all_parents = objectData.all_parents || [];
    all_parents.push(parent);
  }
  const docified = new ObjectsStore({
    is_file: false,
    object_name: folderName,
    parent: parent,
    all_parents: all_parents,
    all_childs: []
  });
  const resultDoc = await docified.save();
  if (parent) {
    await ObjectsStore.findOneAndUpdate(
      { _id: parent },
      { $push: { all_childs: resultDoc._id } }
    ).exec();
  }
  return resultDoc;
};

const insertFile = async (fileObject, parent = null) => {
  let all_parents = [];
  if (parent) {
    const objectData = await ObjectsStore.findOne({ _id: parent })
      .select("all_parents")
      .exec();
    all_parents = objectData.all_parents || [];
    all_parents.push(parent);
  }
  const docified = new ObjectsStore({
    is_file: true,
    parent: parent,
    object_name: fileObject.filename,
    file_name: fileObject.originalname,
    file_path: fileObject.path,
    mimetype: fileObject.mimetype,
    size: fileObject.size,
    all_parents: all_parents
  });

  const resultDoc = await docified.save();
  if (parent) {
    await ObjectsStore.findOneAndUpdate(
      { _id: parent },
      { $push: { all_childs: resultDoc._id } }
    ).exec();
  }
  return resultDoc;
};

module.exports = { createFolder, insertFile };
