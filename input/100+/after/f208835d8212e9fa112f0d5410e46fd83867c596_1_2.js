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
    var forward = dirCtrl.goesForward(difX);
    if (absDifX > threshold) {
      var currentPage = pages.current;
      if (forward && currentPage < pages.total - 1) {
        // Swipe to next page
        goNext(onTransitionEnd);
      } else if (!forward && currentPage > 0) {
        // Swipe to previous page
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