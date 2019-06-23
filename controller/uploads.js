const ObjectsStore = require("../models/Resource_objects");

/**
 *
 * @param {String} folderName
 * @param {String} parent
 */
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
    following_childs: []
  });
  if (parent) {
    await ObjectsStore.findOneAndUpdate(
      { _id: parent },
      { $push: { following_childs: docified._id } }
    ).exec();
  }
  return await docified.save();
};

/**
 *
 * @param {String} fileObject
 * @param {String} parent
 */
const insertFile = async (fileObject, parent = null) => {
  let all_parents = [];
  if (parent) {
    const objectData =
      (await ObjectsStore.findOne({ _id: parent })
        .select("all_parents")
        .exec()) || {};
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
      { $push: { following_childs: resultDoc._id } }
    ).exec();
  }
  return resultDoc;
};

module.exports = { createFolder, insertFile };
