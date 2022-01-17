function () {
    if (!$('#export_head .'+this).hasClass('disabled')) {
    columnsString += (firstColumn?'':'|') + this;
    firstColumn = false;
    }
  }