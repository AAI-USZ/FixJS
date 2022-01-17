function(db) {
  this.mDb = db;
  
  CardMaster.superclass.init.call(this, this.load.bind(this));
  
  this.load();
}