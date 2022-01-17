function(doc) {
  if (!doc._id || doc._id !== this.id) {
    console.warn('Merge ingoring', doc, 'check doc._id');
    return false;
  }

  delete doc._meta;

  var rev = Revision.compute(doc);
  if (rev.replaced) {
    this.addHistory(rev.replaced);
  }

  this.live.push(doc);

  if (!this.liveHashes[rev.hash] || this.liveHashes[rev.hash] < rev.updateCount) {
    this.liveHashes[rev.hash] = rev.updateCount;
    if (this.maxUpdateCount < rev.updateCount) {
      this.maxUpdateCount = rev.updateCount;
    }
  }

  return true;
}