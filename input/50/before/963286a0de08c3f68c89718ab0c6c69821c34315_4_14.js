function () {
    if (!$('#xp_head .'+this).hasClass('disabled')) {
    columnsString += (firstColumn?'':'|') + this;
    firstColumn = false;
    }
  }