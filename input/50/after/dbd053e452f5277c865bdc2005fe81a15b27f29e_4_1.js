function(db) {
  this.mDb = db;

  this.mTree.init(this.load.bind(this));
}