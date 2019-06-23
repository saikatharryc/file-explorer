const ObjectStore = require("../models/Resource_objects");

/**
 *
 * @param {String} parentId
 */
const getObject = async (parentId = null) => {
  return await ObjectStore.find({ parent: parentId }).exec();
};

/**
 *
 * @param {String} objectId
 */
const deleteObject = async objectId => {
  let id_arr = [objectId];
  const { following_childs, parent } = await ObjectStore.findOne({
    _id: objectId
  }).exec();
  id_arr = id_arr.concat(following_childs);
  await ObjectStore.update(
    { _id: parent },
    { $pull: { following_childs: objectId } }
  ).exec();

  // return await ObjectStore.remove({ _id: { $in: id_arr } }).exec(); //this doesnot support doc hooks
  let p_arr = [];
  for (const i of id_arr) {
    const singDoc = await ObjectStore.findOne({ _id: i }).exec();
    p_arr.push(singDoc.remove());
  }
  return await Promise.all(p_arr);
};

/**
 *
 * @param {String} newName
 * @param {String} objectId
 */
const renameObject = async (newName, objectId) => {
  return await ObjectStore.update(
    { _id: objectId },
    { $set: { file_name: newName } }
  ).exec();
};

module.exports = { getObject, deleteObject, renameObject };
