function (event) {
    if (!$(event.target).hasClass('btn') && !$(event.target).hasClass('btnContainer')) {
      instance.deselectCell();
      $(this).addClass('active');
      that.lastActive = this;
      var offset = instance.blockedCols.count();
      instance.selectCell(this.parentNode.rowIndex - offset, 0, this.parentNode.rowIndex - offset, instance.colCount - 1, false);
    }
  }