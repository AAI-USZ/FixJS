function(doc, ignoreMeta) {
  this.id = this.id || doc._id;

  var meta = doc._meta;
  delete doc._meta;

  if (this.addRevision(doc) && !ignoreMeta && meta) {
    this.addMeta(meta);

    if (!this.lastRev) {
      this.lastRev = doc._rev;
      if (meta.history) {
        this.lastHistorySize = meta.history.length;
      }
    }
  }
}