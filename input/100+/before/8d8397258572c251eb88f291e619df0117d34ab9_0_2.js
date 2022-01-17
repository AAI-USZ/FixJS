function getNumberOfRowsForPageScroll(direction) {
      var height = _configuration.getWindowSize().height;
      if (direction === 'up') {
        var newTopRow = _self.currentCell.row - height;
        if (newTopRow < 0) {
          // The scroll exceeds bounds.
          return Math.max(0, height + newTopRow);
        }
      } else {
        var matrixHeight = _api.getMatrixSize().height;
        var newBottomRow = _self.currentCell.row + height + _cellElements.length - _configuration.getNumberOfBackgroundCells() - 1;
        if (newBottomRow >= matrixHeight-1) {
          // The scroll exceeds bounds
          return Math.max(0, height - (newBottomRow - matrixHeight));
        }
      }
      return height;
    }