function(direction, sortColumn) {
  var orderby = "";
  if (sortColumn === undefined) {
    if (this.mTree.mSortOrder != null) {
      orderby = "order by " + this.mTree.mSortOrder;
    } else {
      orderby = "order by transaction_date"
    }
  } else if (sortColumn === "") {
    orderby = "";
  } else {
    orderby = "order by " + sortColumn;
    this.mTree.mSortOrder = sortColumn;
  }
  
  var count = this.mDb.getRowCount('km_realmoney_trns', '');
  this.mTree.setRowCount(count);
  $$('km_total').value = count;
  this.mTree.setOffset(direction);
  var sql = "select "
    + "A.transaction_date, "
    + "A.item_id, "
    + "B.name as item_name, "
    + "A.detail, "
    + "A.income, "
    + "A.expense, "
    + "A.user_id, "
    + "C.name as user_name, "
    + "A.internal, "
    + "A.rowid "
    + "from km_realmoney_trns A "
    + "left join km_item B "
    + " on A.item_id = B.rowid "
    + "inner join km_user C "
    + " on A.user_id = C.id "
    + orderby + " "
    + "limit " + this.mTree.mLimit + " offset " + this.mTree.mOffset;
  km_log(sql);
  this.mDb.selectQuery(sql);
  var records = this.mDb.getRecords();
  var types = this.mDb.getRecordTypes();
  var columns = this.mDb.getColumns();
  
  this.mTree.PopulateTableData(records, columns, types);
  this.mTree.ensureRowIsVisible(9, -1);
  this.mTree.ShowTable(true);
    
  $$('km_from_value').value = this.getFromValue();
  $$('km_to_value').value = this.getToValue();
}