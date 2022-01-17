function isValidDrag(overflow) {
      var nBackgroundCells = 1;
      switch(overflow) {
        case jMatrixBrowseNs.Constants.OVERFLOW_TOP:
          if (_renderer.currentCell.row - nBackgroundCells + _renderer.getCellElements().length - 1 >= _api.getMatrixSize().height-1)
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_BOTTOM:
          if (_renderer.currentCell.row <= 0 + nBackgroundCells) 
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_LEFT:
          if (_renderer.currentCell.col - nBackgroundCells + _renderer.getCellElements()[0].length - 1 >= _api.getMatrixSize().width-1) 
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_RIGHT:
          if (_renderer.currentCell.col <= 0 + nBackgroundCells) 
            return false;
          return true;
      }
    }