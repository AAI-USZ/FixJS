function isValidDrag(overflow) {
      switch(overflow) {
        case jMatrixBrowseNs.Constants.OVERFLOW_TOP:
          if (_renderer.currentCell.row >= _api.getMatrixSize().height-1)
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_BOTTOM:
          if (_renderer.currentCell.row <= 0) 
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_LEFT:
          if (_renderer.currentCell.col >= _api.getMatrixSize().width-1) 
            return false;
          return true;
          
        case jMatrixBrowseNs.Constants.OVERFLOW_RIGHT:
          if (_renderer.currentCell.col <= 0) 
            return false;
          return true;
      }
    }