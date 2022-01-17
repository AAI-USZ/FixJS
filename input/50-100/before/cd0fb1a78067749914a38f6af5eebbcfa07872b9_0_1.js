function() {
        $(':not(.invalid)').qtip('destroy');
        return $('.invalid').qtip({
          overwrite: false,
          content: {
            text: function(api) {
              return $(this).attr('data-error');
            }
          },
          position: {
            my: 'left center',
            at: 'right center',
            viewport: $(window)
          },
          show: {
            event: false,
            ready: true
          },
          hide: false,
          style: {
            classes: 'ui-tooltip-jtools'
          }
        });
      }