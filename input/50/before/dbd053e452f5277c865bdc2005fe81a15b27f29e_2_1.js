function(db) {
  this.mDb = db;
  
  UserMaster.superclass.init.call(this, this.load.bind(this));
  
  this.load();
}