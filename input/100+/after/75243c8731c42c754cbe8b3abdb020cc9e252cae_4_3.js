function () {
        var $body = $('body'),
          self = this;

        if (Modernizr.touch) {
          $body.on('click.tooltip touchstart.tooltip touchend.tooltip', settings.targetClass, function (e) {
            e.preventDefault();
            var $this = $(this);
            $(settings.tooltipClass).hide();
            methods.showOrCreateTip($this);
          });
          $(settings.tooltipClass).on('click.tooltip touchstart.tooltip touchend.tooltip', function (e) {
            e.preventDefault();
            $(this).fadeOut(150);
          });
        } else {
          $body.on('mouseover.tooltip mouseout.tooltip', settings.targetClass, function (e) {
            var $this = $(this);
            if (e.type === 'mouseover') {
              methods.showOrCreateTip($this);
            } else if (e.type === 'mouseout') {
              methods.hide($this);
            }
          });
        }

      }