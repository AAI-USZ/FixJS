function(doc) {
  if (!doc._id || doc._id !== this.id) {
    console.warn('Merge ignoring', doc, 'check doc._id');
    return false;
  }

  var rev = Revision.compute(doc);
  if (rev.replaced) {
    this.addHistory(rev.replaced);
  }

  if (!this.liveHashes[rev.hash] || this.liveHashes[rev.hash] < rev.updateCount) {
    this.live.push(doc);
    this.liveHashes[rev.hash] = rev.updateCount;
    if (this.maxUpdateCount < rev.updateCount) {
      this.maxUpdateCount = rev.updateCount;
    }
  }

  return true;
}