const ObjectStore = require("../models/Resource_objects");

const getObject = async (parentId = null) => {
  return await ObjectStore.find({ parent: parentId }).exec();
};

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

module.exports = { getObject, deleteObject };
