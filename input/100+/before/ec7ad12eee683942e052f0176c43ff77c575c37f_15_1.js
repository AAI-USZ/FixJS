function ut_onTouchMove(touch) {
    var screenHeight = this.overlay.getBoundingClientRect().height,
        gripBarHeight = this.gripBar.getBoundingClientRect().height,
        dy = -(this.startY - touch.pageY),
        newHeight;
    if (this.shown)
      dy += screenHeight;
    dy = Math.min(screenHeight, dy);

    if (dy > gripBarHeight) {
      var firstShownHeight = this.firstShown.getBoundingClientRect().height;

      if (dy < firstShownHeight + gripBarHeight) {
        newHeight = screenHeight - firstShownHeight - gripBarHeight;
      } else {
        newHeight = screenHeight - dy;
      }
      this.firstShown.style.MozTransition = '';
      this.firstShown.style.MozTransform = 'translateY(' + newHeight + 'px)';
    }

    var style = this.overlay.style;
    style.MozTransition = '';
    style.MozTransform = 'translateY(' + dy + 'px)';
  }