function(evt) {
    evt.preventDefault();
    
    window.clearTimeout(mouseWheelTimeout);
    
    var originalEvent = evt.originalEvent;
    var detail = originalEvent.detail;
    var delta = originalEvent.wheelDelta;
    var normalizedDelta = (detail) ? ((delta) ? ((delta / detail / 40 * detail > 0) ? 1 : -1) : -detail / 3) : delta / 120;
    
    var scrollContent = self.getScrollContent();
    var scrollViewSize = self.getSize();
    var contentSize = scrollContent.getSize();
    
    var minimumX = scrollViewSize.width - contentSize.width;
    var minimumY = scrollViewSize.height - contentSize.height;
    self.setMinimumX(minimumX);
    self.setMinimumY(minimumY);
    
    var deltaX = 0;
    var deltaY = normalizedDelta * 8;
    
    var shouldScrollHorizontal = self.shouldScrollHorizontal();
    var shouldScrollVertical = self.shouldScrollVertical();
    
    var scrollOffset = self.getScrollOffset();
    var x = scrollOffset.x + deltaX;
    var y = scrollOffset.y + deltaY;
    
    var distancePastBoundsX = (x < minimumX) ? minimumX - x : ((x > 0) ? x : 0);
    var distancePastBoundsY = (y < minimumY) ? minimumY - y : ((y > 0) ? y : 0);
    
    if (distancePastBoundsX > 0) x -= deltaX / 4;
    if (distancePastBoundsY > 0) y -= deltaY / 4;
    
    if (self.getPullToRefresh() && y >= $pullToRefresh.height() - 1) {
      y = $pullToRefresh.height() - 1;
      $pullToRefresh.addClass('sk-active');
    }
    
    self.setScrollOffset({
      x: shouldScrollHorizontal ? x : 0,
      y: shouldScrollVertical ? y : 0
    });
    
    var shouldStartScroll = false;
    
    if (shouldScrollHorizontal && deltaX !== 0) {
      horizontalScrollBar.update();
      shouldStartScroll = !isScrolling;
    }
    
    if (shouldScrollVertical && deltaY !== 0) {
      verticalScrollBar.update();
      shouldStartScroll = !isScrolling;
    }
    
    if (shouldStartScroll) beforeScrollStart();
    
    mouseWheelTimeout = window.setTimeout(function() {      
      x = (x < minimumX) ? minimumX : (x > 0) ? 0 : x;
      y = (y < minimumY) ? minimumY : (y > 0) ? 0 : y;
      
      if (self.getPullToRefresh() && $pullToRefresh.hasClass('sk-active')) {
        $pullToRefresh.removeClass('sk-active');
        $element.trigger(ScrollKit.ScrollView.EventType.DidPullToRefresh);
      }
      
      self.setScrollOffset({
        x: shouldScrollHorizontal ? x : 0,
        y: shouldScrollVertical ? y : 0
      }, kBounceTransitionDuration);
      
      beforeScrollEnd();
    }, kMouseWheelTimeout);
  }