function reloadColData(event) {
      var colData;
      var colToBeReplacedIndex;
      var nBackgroundCells = 1; // TODO:
      var colIndex;
      if (event.direction === 'left') {
        // If overflow from left, right column will have to be fetched. 
        colData = _api.getColDataForCell({
         row: event.currentCell.row,
         col: event.currentCell.col - nBackgroundCells + _renderer.getCellElements()[0].length - 1 
        });
        colIndex = event.currentCell.col - nBackgroundCells + _renderer.getCellElements()[0].length - 1;
        colToBeReplacedIndex = _renderer.getCellElements()[0].length-1;
      } else {
        // If overflow from right, left column will have to be fetched.
        colData = _api.getColDataForCell({
         row: event.currentCell.row,
         col: event.currentCell.col - nBackgroundCells
        });
        colIndex = event.currentCell.col - nBackgroundCells;
        colToBeReplacedIndex = 0;
      }
      
      for (var i = 0; i < _renderer.getCellElements().length; ++i) {
        var cell = _renderer.getCellElements()[i][colToBeReplacedIndex];
        jQuery(cell).html(colData[i]);
        jQuery(cell).attr('data-row', event.currentCell.row - nBackgroundCells + i);
        jQuery(cell).attr('data-col', colIndex);
      }
    }