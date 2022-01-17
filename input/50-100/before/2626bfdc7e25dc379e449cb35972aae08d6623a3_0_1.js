function () {
    that.instance.deselectCell();
    var $th = $(this);
    $th.addClass('active');
    that.lastActive = this;
    var index = $th.index();
    var offset = instance.blockedCols ? instance.blockedCols.count() : 0;
    that.instance.selectCell(0, index - offset, that.instance.rowCount - 1, index - offset, false);
  }