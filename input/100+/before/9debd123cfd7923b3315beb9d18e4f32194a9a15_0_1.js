function(event) {
        var el = this;

        if ($(el).hasClass('touch-started')) {
          $(el).removeClass('touched').removeClass('touch-started');

          if ( $(event.target).is('input[type="checkbox"]') ) {
            $(event.target).attr('checked', !$(event.target).is(':checked') );
        }

          if ( $(event.target).is('label') ) {
            var forId = $(event.target).attr('for');
            var forEl = $('#' + forId);
            if (forEl.is(':checkbox')) {
              forEl.attr('checked', !forEl.is(':checked') );
            } else {
              forEl.focus();
            }
          }

          if ( $(event.target).is('a') ) {
              var target = $(event.target);
              var href = target.attr('href');

              if (href !== '' && href !== '#') {
                  if (target.attr('target') === '_blank') {
                      window.open(target.attr('href'));
                  } else {
                      window.location.href = target.attr('href');
                  }
                  return false;
              }
              
          }

          fireCallback(el, event);
        }


        return true;
      }