function() {
  this.mDb.selectQuery("select id, name from km_user");
  var records = this.mDb.getRecords();
  var types = this.mDb.getRecordTypes();
  var columns = this.mDb.getColumns();

  this.mUserList = this.mDb.getRecords();

  this.mTree.PopulateTableData(records, columns, types);
  this.mTree.ShowTable(true);
  
}