function(e){
       cancelLongTap()

      // double tap (tapped twice within 250ms)
      if (touch.isDoubleTap) {
        touch.el.trigger('doubleTap')
        touch = {}

      // swipe
      } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
        swipeTimeout = setTimeout(function() {
          touch.el.trigger('swipe') &&
          touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
          touch = {}
        }, 0);

      // normal tap
      } else if ('last' in touch) {
        tapTimeout = setTimeout(function() {
          var event = $.Event('tap');
          event.cancelTouch = cancelAll;
          touch.el.trigger(event)
        }, 0);

        touchTimeout = setTimeout(function(){
          touchTimeout = null
          touch.el.trigger('singleTap')
          touch = {}
        }, 250)
      }
    }