function (doc) {
  var tid = this.get('_id');
  var docid = doc.get('_id');
  return tid.equals
    ? tid.equals(docid)
    : tid === docid;
}