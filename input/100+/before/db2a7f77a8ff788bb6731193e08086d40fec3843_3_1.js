function()
    {
      var firstRow = this._layer.getFirstRow();
      var rowSize = this._layer.getRowSizes().length;

      for (var row = firstRow; row < firstRow + rowSize; row++)
      {
        var widget = this._layer.getRenderedCellWidget(row, 0);
        if (widget != null) {
          this.__itemWidth = Math.max(this.__itemWidth, widget.getSizeHint().width);
        }
      }
      var paneWidth = this.getPane().getInnerSize().width;
      this.getPane().getColumnConfig().setItemSize(0, Math.max(this.__itemWidth, paneWidth));
    }