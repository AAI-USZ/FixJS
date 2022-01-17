function() {
    var numberOfRows = this._numberOfRows;
    var visibleCellCount = Math.min(this.getCalculatedNumberOfVisibleCells(), numberOfRows);
    var hiddenCellCount = numberOfRows - visibleCellCount;
    
    var scrollView = this.scrollView;
    
    // Scroll to the top of the table view without animating.
    scrollView.setScrollOffset({ x: 0, y: 0 });
    
    // Set the scroll view margin.
    scrollView.getScrollContent().setMargin({
      top: 0,
      bottom: hiddenCellCount * this.getRowHeight()
    });
  }