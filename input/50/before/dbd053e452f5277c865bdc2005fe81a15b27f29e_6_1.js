function(db) {
  this.mDb = db;
  this.mTree.init(this, this.load.bind(this));
}