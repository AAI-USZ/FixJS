function generatePositionsForDrag(draggable, event) {
    var o = draggable.options, scroll = draggable.cssPosition == 'absolute' && !(draggable.scrollParent[0] != document && $.ui.contains(draggable.scrollParent[0], draggable.offsetParent[0])) ? draggable.offsetParent : draggable.scrollParent, scrollIsRootNode = (/(html|body)/i).test(scroll[0].tagName);
    var pageX = event.pageX;
    var pageY = event.pageY;

    var newPosition = {
      top: (
              pageY															// The absolute mouse position
              - draggable.offset.click.top												// Click offset (relative to the element)
              - draggable.offset.relative.top												// Only for relative positioned nodes: Relative offset from element to offset parent
              - draggable.offset.parent.top												// The offsetParent's offset without borders (offset + border)
              + (jQuery.browser.safari && jQuery.browser.version < 526 && draggable.cssPosition == 'fixed' ? 0 : ( draggable.cssPosition == 'fixed' ? -draggable.scrollParent.scrollTop() : ( scrollIsRootNode ? 0 : scroll.scrollTop() ) ))
      ),
      left: (
              pageX															// The absolute mouse position
              - draggable.offset.click.left												// Click offset (relative to the element)
              - draggable.offset.relative.left												// Only for relative positioned nodes: Relative offset from element to offset parent
              - draggable.offset.parent.left												// The offsetParent's offset without borders (offset + border)
              + (jQuery.browser.safari && jQuery.browser.version < 526 && draggable.cssPosition == 'fixed' ? 0 : ( draggable.cssPosition == 'fixed' ? -draggable.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft() ))
      )
    };

    // Impose contraints on newPosition to prevent crossing of matrix bounds. 
    // Compute change in position for the drag.
    var changeInPosition = {
      top: (draggable._convertPositionTo("absolute", newPosition).top - draggable.positionAbs.top),
      left: (draggable._convertPositionTo("absolute", newPosition).left - draggable.positionAbs.left)
    };
    // Get element and container offsets
    var element = jQuery(_cellElements[0][0]);
    var containerOffset = _container.offset();
    var elementOffset = element.offset();

    // If we are at the topmost cell, then check that bounds from the top are maintained.
    if (_self.currentCell.row == 1) {
      // The new posoition.top of the first element relative to cotainter.
      var top = changeInPosition.top + elementOffset.top - containerOffset.top;
      if (top > 0) { // The drag crosses matrix bounds from the top.
        newPosition.top = newPosition.top - top;
      }
    }

    // If we are at the leftmost cell, then check that bounds from the left are maintained.
    if (_self.currentCell.col == 1) {
      // The new posoition.top of the first element relative to cotainter.
      var left = changeInPosition.left + elementOffset.left - containerOffset.left;
      if (left > 0) { // The drag crosses matrix bounds from the left.
        newPosition.left = newPosition.left - left;
      }
    }

    // Get element offset for last element
    element = jQuery(_cellElements[_cellElements.length-1][_cellElements[0].length-1]);
    elementOffset = element.offset();

    // If we are at the bottomost cell, then check that bounds from the bottom are maintained.
    if (_self.currentCell.row - _configuration.getNumberOfBackgroundCells() + _cellElements.length - 1 >= _api.getMatrixSize().height-1) {
      var containerBottom = (containerOffset.top + _container.height());
      var elementBottom = (changeInPosition.top + elementOffset.top + element.height());
      // The new posoition.bottom of the last element relative to cotainter.
      var bottom =  containerBottom - elementBottom;
      if (bottom > 0) { // The drag crosses matrix bounds from the bottom.
        newPosition.top = newPosition.top + bottom;
      }
    }

    // If we are at the leftmost cell, then check that bounds from the left are maintained.
    if (_self.currentCell.col - _configuration.getNumberOfBackgroundCells() + _cellElements[0].length - 1 >= _api.getMatrixSize().width-1) {
      // The new posoition.right of the first element relative to cotainter.
      var containerRight = (containerOffset.left + _container.width());
      var newElementRight = (changeInPosition.left + elementOffset.left + element.width());
      var right =  containerRight - newElementRight;
      if (right > 0) { // The drag crosses matrix bounds from the left.
        newPosition.left = newPosition.left + right;
      }
    }
    
    return newPosition;

  }