function ut_onTouchMove(touch) {
    var screenHeight = this.overlay.getBoundingClientRect().height;
    var dy = -(this.startY - touch.pageY);
    if (this.shown)
      dy += screenHeight;
    dy = Math.min(screenHeight, dy);

    var style = this.overlay.style;
    style.MozTransition = '';
    style.MozTransform = 'translateY(' + dy + 'px)';
  }