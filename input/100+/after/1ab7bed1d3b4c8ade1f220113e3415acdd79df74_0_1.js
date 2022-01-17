function(e)
    {
      var pane = e.getTarget();
      var width = e.getData().width;

      var colCount = Math.max(1, Math.floor(width/this.itemWidth));
      if (colCount == this.itemsPerLine) {
        return;
      }
      this.itemPerLine = colCount;
      var rowCount = Math.ceil(this.itemCount/colCount);

      pane.getColumnConfig().setItemCount(colCount);
      pane.getRowConfig().setItemCount(rowCount);
    }