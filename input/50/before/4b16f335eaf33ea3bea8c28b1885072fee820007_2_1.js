function(docId, revision) {
  return new (((docId && docId.match(/^_design\//)) ? Design : Document))(
    docId || null,
    revision || null,
    this._connection,
    this
  );
}