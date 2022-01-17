function(evt) {
    var scrollOffset = scrollView.getScrollOffset();
    var offset = -scrollOffset.y;
    if (offset < 0) return;
    
    var firstCellElement = $element.children('li:first-child')[0];
    var lastCellElement = $element.children('li:last-child')[0];
    if (!firstCellElement || !lastCellElement || firstCellElement === lastCellElement) return;
    
    var dataSource = self.getDataSource();
    var rowHeight = self.getRowHeight();
    var numberOfRows = self._numberOfRows;
    var visibleCellCount = self.getCalculatedNumberOfVisibleCells();
    var selectedRowIndex = self.getIndexForSelectedRow();
    
    var firstCell = firstCellElement.tableViewCell;
    var firstCellIndex = firstCell.getIndex();
    var lastCellIndex = firstCellIndex + visibleCellCount - 1;
    
    // Manually calculate offset instead of calling .offset().
    var margin = scrollContent.getMargin();
    var firstCellOffset = margin.top - offset;
    var lastCellOffset = firstCellOffset + (visibleCellCount * rowHeight);
    var delta = offset - lastOffset;
    var visibleHeight = self.getVisibleHeight();
    
    lastOffset = offset;
    
    var newMarginTopDelta = 0;
    var newMarginBottomDelta = 0;
    
    // Handle scrolling when swiping up (scrolling towards the bottom).
    if (delta > 0 && lastCellIndex + 1 < numberOfRows && firstCellOffset < 0 - (rowHeight * numberOfBufferedCells)) {
      $element.children('li:nth-child(-n+' + numberOfBufferedCells + ')').each(function(index, element) {
        var newCellIndex = lastCellIndex + index + 1;
        if (newCellIndex >= numberOfRows) return;
        
        var cell = element.tableViewCell;
        cell.prepareForReuse();
        
        var newCell = dataSource.getCellForRowAtIndex(self, newCellIndex);
        if (self.isRowSelectedAtIndex(newCellIndex)) newCell.setSelected(true);
        $element.append(newCell.$element);
        
        newMarginTopDelta += rowHeight;
        newMarginBottomDelta -= rowHeight;
      });
      
      scrollContent.setMargin({
        top: margin.top + newMarginTopDelta,
        bottom: margin.bottom + newMarginBottomDelta
      });
    }
    
    // Handle scrolling when swiping down (scrolling towards the top).
    else if (delta < 0 && firstCellIndex - 1 >= 0 && lastCellOffset > visibleHeight + (rowHeight * numberOfBufferedCells)) {
      $element.children('li:nth-child(n+' + (visibleCellCount - numberOfBufferedCells + 1) + ')').each(function(index, element) {
        var newCellIndex = firstCellIndex - index - 1;
        if (newCellIndex < 0) return;
        
        var cell = element.tableViewCell;
        cell.prepareForReuse();
        
        var newCell = dataSource.getCellForRowAtIndex(self, newCellIndex);
        if (self.isRowSelectedAtIndex(newCellIndex)) newCell.setSelected(true);
        $element.prepend(newCell.$element);
        
        newMarginTopDelta -= rowHeight;
        newMarginBottomDelta += rowHeight;
      });
      
      scrollContent.setMargin({
        top: margin.top + newMarginTopDelta,
        bottom: margin.bottom + newMarginBottomDelta
      });
    }
  }