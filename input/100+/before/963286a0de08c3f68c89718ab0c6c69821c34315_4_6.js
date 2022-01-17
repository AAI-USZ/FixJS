function xp_enabled_columns() {
  columns = new Array('date','from','to','time','dec_time','rate','wage','budget','approved','status','billable','knd','pct','action','description','comment','location','trackingnr','user','cleared');
  columnsString = '';
  firstColumn = true;
  $(columns).each(function () {
    if (!$('#xp_head .'+this).hasClass('disabled')) {
    columnsString += (firstColumn?'':'|') + this;
    firstColumn = false;
    }
  });
  return columnsString;
}