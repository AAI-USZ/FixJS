function (event) {
    if (!$(event.target).hasClass('btn') && !$(event.target).hasClass('btnContainer')) {
      that.instance.deselectCell();
      $(this).addClass('active');
      that.lastActive = this;
      var offset = that.instance.blockedCols.count();
      that.instance.selectCell(this.parentNode.rowIndex - offset, 0, this.parentNode.rowIndex - offset, that.instance.colCount - 1, false);
    }
  }