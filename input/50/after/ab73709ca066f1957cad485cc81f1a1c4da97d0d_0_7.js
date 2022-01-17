function numberOfConflicts(doc) {
  var doc = doc || this.body;

  if (doc._meta && doc._meta.conflicts) {
    return doc._meta.conflicts.length;
  } else {
    return 0;
  }
}