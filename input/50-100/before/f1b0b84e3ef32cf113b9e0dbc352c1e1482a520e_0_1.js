function() {
          var event = $.Event('tap');
          event.cancelTouch = cancelAll;
          touch.el.trigger(event)
        }