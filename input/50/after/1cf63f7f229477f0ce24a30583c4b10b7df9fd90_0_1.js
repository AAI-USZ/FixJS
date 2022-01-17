function(docId, revision) {
  var Doc = (docId && docId.match(/^_design\//)) ? Design : Document;

  return new Doc(
    docId || null,
    revision || null,
    this._connection,
    this
  );
}