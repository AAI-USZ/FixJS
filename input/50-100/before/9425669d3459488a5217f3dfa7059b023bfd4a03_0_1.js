function(event) {
        var $el = $(this);

        if ($el.prop('tappableEvent')) {
          event = $el.prop('tappableEvent');
          
          $el
            .removeProp('tappableEvent')
            .removeClass('touched');

          fireCallback(opts.callback, $el, event, true);
        }
      }