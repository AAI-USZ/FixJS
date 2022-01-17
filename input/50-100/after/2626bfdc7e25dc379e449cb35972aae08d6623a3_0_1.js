function () {
    instance.deselectCell();
    var $th = $(this);
    $th.addClass('active');
    that.lastActive = this;
    var index = $th.index();
    var offset = instance.blockedCols ? instance.blockedCols.count() : 0;
    instance.selectCell(0, index - offset, instance.rowCount - 1, index - offset, false);
  }