function() {
    var numberOfRows = this._numberOfRows;
    var visibleCellCount = Math.min(this.getCalculatedNumberOfVisibleCells(), numberOfRows);
    var hiddenCellCount = numberOfRows - visibleCellCount;
    
    var scrollView = this.scrollView;
    
    // Scroll to the top of the table view without animating.
    scrollView.setContentOffset({ x: 0, y: 0 }, false);
    
    // Set the scroll view margin.
    scrollView.setMargin({
      top: 0,
      bottom: hiddenCellCount * this.getRowHeight()
    });
  }