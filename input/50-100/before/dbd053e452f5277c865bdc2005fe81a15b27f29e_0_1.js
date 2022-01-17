function() {
  this.mDb.selectQuery("select A.rowid, A.name, A.user_id, B.name "
                       + "from km_creditcard_info A, km_user B "
                       + "where A.user_id = B.id");
  
  var records = this.mDb.getRecords();
  var types = this.mDb.getRecordTypes();
  var columns = this.mDb.getColumns();

  this.PopulateTableData(records, columns, types);
  this.ShowTable(true);
  
}