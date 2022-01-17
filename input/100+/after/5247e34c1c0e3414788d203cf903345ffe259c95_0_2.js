function reloadRowData(event) {
      var rowData;
      var rowToBeReplaced;
      var nBackgroundCells = 1; // TODO:
      var rowIndex;
      if (event.direction === 'top') {
        // If overflow from top, bottom row will have to be fetched.
        // First check if the row is within matrix bounds
        if (event.currentCell.row - nBackgroundCells + _renderer.getCellElements().length - 1 >= _api.getMatrixSize().height)
          return;
        rowData = _api.getRowDataForCell({
         row: event.currentCell.row - nBackgroundCells + _renderer.getCellElements().length - 1,
         col: event.currentCell.col
        });
        rowIndex = event.currentCell.row - nBackgroundCells + _renderer.getCellElements().length - 1;
        rowToBeReplaced = _renderer.getCellElements()[_renderer.getCellElements().length-1];
      } else {
        // If overflow from bottom, top row will have to be fetched.
        // First check if the row is within matrix bounds
        if (event.currentCell.row - nBackgroundCells < 0)
          return;
        rowData = _api.getRowDataForCell({
         row: event.currentCell.row - nBackgroundCells,
         col: event.currentCell.col
        });
        rowIndex = event.currentCell.row - nBackgroundCells;
        rowToBeReplaced = _renderer.getCellElements()[0];
      }
      
      jQuery.each(rowToBeReplaced, function(index, cell) {
        jQuery(cell).html(rowData[index]);
        jQuery(cell).attr('data-row', rowIndex);
        jQuery(cell).attr('data-col', event.currentCell.col - nBackgroundCells + index);
      });
    }