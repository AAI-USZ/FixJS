function() {
          var event = $.Event('tap');
          event.cancelTouch = cancelAll;
          touch.el.trigger(event)

          if (touch.isDoubleTap) {
            touch.el.trigger('doubleTap')
            touch = {}
          }
          else {
            touchTimeout = setTimeout(function(){
              touchTimeout = null
              touch.el.trigger('singleTap')
              touch = {}
            }, 250)
          }

        }