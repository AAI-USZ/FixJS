function ObjectIdfromString(id) {
  return BSON.ObjectID.createFromHexString(id);
}