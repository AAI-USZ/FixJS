function onEndEvent(evt) {
    evt.stopPropagation();
    window.removeEventListener('mousemove', GridManager);
    window.removeEventListener('mouseup', GridManager);

    if (dragger.dragging) {
      dragger.stop();
      delete container.dataset.transitioning;
      return;
    }

    var difX = status.cCoords.x - status.iCoords.x;
    var absDifX = Math.abs(difX);
    var threshold = window.innerWidth / 4;
    if (absDifX > threshold) {
      var currentPage = pages.current;
      if (difX < 0 && currentPage < pages.total - 1) {
        // Swipe from right to left
       goNext(onTransitionEnd);
      } else if (difX > 0 && currentPage > 0) {
        // Swipe from left to right
        goPrev(onTransitionEnd);
      } else {
        // Bouncing effect for first or last page
        keepPosition(onTransitionEnd);
      }
    } else if (absDifX < thresholdForTapping) {
      pageHelper.getCurrent().tap(status.target);
      // Sometime poor devices fire touchmove events when users are only
      // tapping
      keepPosition(onTransitionEnd);
    } else {
      // Keep position when the movement is less than the threshold
      keepPosition(onTransitionEnd);
    }
  }