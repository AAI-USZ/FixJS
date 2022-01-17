function() {
        if (typeof options == 'string') {
          if ($(this).data('tiSlideshow')) {
            obj = $.tiSlideshow.interfaces[$(this).data('id')];
            /* Manage the commands that can be passed as parameters */
            if (options == 'open')
              obj.open();
            if (options == 'close')
              obj.close();
            if (options == 'next')
              obj.next();
            if (options == 'previous')
              obj.previous();
          }
        } else {
          if ($(this).data('tiSlideshow')) {
            $.tiSlideshow.interfaces[$(this).data('id')].changeOptions(options);
          } else {
            var id = $.tiSlideshow.interfaces.length;
            $(this).data('tiSlideshow', true);
            $(this).data('id', id);
            new tiSlideshow($(this), extendedOptions, id);
          }
        }
      }