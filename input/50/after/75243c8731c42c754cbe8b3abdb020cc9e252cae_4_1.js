function (e) {
            e.preventDefault();
            var $this = $(this);
            $(settings.tooltipClass).hide();
            methods.showOrCreateTip($this);
          }