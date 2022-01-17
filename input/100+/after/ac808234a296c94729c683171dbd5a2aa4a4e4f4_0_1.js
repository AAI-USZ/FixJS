function() {
  var liveVersions = [];

  for (var ii in this.live) {
    var doc = this.live[ii];
    var rev = doc._rev;

    // check if same hash, higher update count exists
    if (this.liveHashes[rev.hash] !== rev.updateCount) {
      this.addHistory(rev);
      continue;
    }

    // check if this revision is already in the history
    if (this.history[rev.toString()]) {
      continue;
    }

    liveVersions.push(doc);
  }

  // sort them by revision, last one is the winner, rest is conflicts
  liveVersions.sort(Revision.sort);
  var winner = liveVersions.pop();

  if (!winner) {
    // this should not happen, but we defend against no live versions anyway
    winner = {
      _deleted: true
    };
    Revision.compute(winner);
  }

  // now remove all the tombstones from conflicts
  liveVersions = liveVersions.filter(filterLiveOnly);

  // now let's compute the final history set
  var finalHistory = [];
  for (ii in this.history) {
    finalHistory.push(this.history[ii]);
  }

  // make sure every visible update results in a version change
  if (this.lastRev &&
      finalHistory.length !== lastHistorySize &&
      this.lastRev.hash === winner._rev.hash && this.lastRev.updateCount === winner._rev.updateCount
  ) {
    finalHistory.push(new Revision(winner));
    winner._rev.updateCount++;
  }

  // populate winner._meta
  if (finalHistory.length || liveVersions.length) {
    winner._meta = {};
    if (finalHistory.length) {
      winner._meta.history = finalHistory.slice(-1 * Document.maxHistorySize);
    }
    if (liveVersions.length) {
      winner._meta.conflicts = liveVersions;
    }
  }

  return winner;
}