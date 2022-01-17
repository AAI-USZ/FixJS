function() {
  this.mDb.selectQuery("select rowid, name, internal from km_item");
  var records = this.mDb.getRecords();
  var types = this.mDb.getRecordTypes();
  var columns = this.mDb.getColumns();

  this.mItemList = this.mDb.getRecords();

  this.PopulateTableData(records, columns, types);
  this.ShowTable(true);
  
}