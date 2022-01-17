function export_enabled_columns() {
  columns = new Array('date','from','to','time','dec_time','rate','wage','budget','approved','status','billable','customer','project','activity','description','comment','location','trackingNumber','user','cleared');
  columnsString = '';
  firstColumn = true;
  $(columns).each(function () {
    if (!$('#export_head .'+this).hasClass('disabled')) {
    columnsString += (firstColumn?'':'|') + this;
    firstColumn = false;
    }
  });
  return columnsString;
}