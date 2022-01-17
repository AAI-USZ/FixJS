function(db) {
  this.mDb = db;
  
  ItemMaster.superclass.init.call(this, this.load.bind(this));
  
  this.load();
}