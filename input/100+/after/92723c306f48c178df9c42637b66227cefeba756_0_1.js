function(action_url, title, size_x, size_y, resizable, modal, overflow) {
      overflow == undefined ? overflow = true : overflow = overflow;
      if (size_x === 'fullscreen') {
        size_x = $(window).width() - 50;
        size_y = $(window).height() - 50;
      }
      var $dialog = $('<div style="display:none" id="alchemyOverlay"></div>');
      $dialog.appendTo('body');
      $dialog.html(Alchemy.getOverlaySpinner({
        x: size_x === 'auto' ? 400 : size_x,
        y: size_y === 'auto' ? 300 : size_y
      }));
      Alchemy.CurrentWindow = $dialog.dialog({
        modal: modal,
        minWidth: size_x === 'auto' ? 400 : size_x,
        minHeight: size_y === 'auto' ? 300 : size_y,
        title: title,
        resizable: resizable,
        show: "fade",
        hide: "fade",
        width: size_x,
        open: function(event, ui) {
          $.ajax({
            url: action_url,
            success: function(data, textStatus, XMLHttpRequest) {
              $dialog.html(data);
              $dialog.css({
                overflow: overflow ? 'visible' : 'auto'
              });
              $dialog.dialog('widget').css({
                overflow: overflow ? 'visible' : 'hidden'
              });
              if (size_x === 'auto') {
                $dialog.dialog('widget').css({
                  left: (($(window).width() / 2) - ($dialog.width() / 2))
                });
              }
              if (size_y === 'auto') {
                $dialog.dialog('widget').css({
                  top: ($(window).height() - $dialog.dialog('widget').height()) / 2
                });
              }
              Alchemy.SelectBox('#alchemyOverlay');
              Alchemy.Datepicker('#alchemyOverlay input.date, #alchemyOverlay input[type="date"]');
              Alchemy.ButtonObserver('#alchemyOverlay .button');
              Alchemy.overlayObserver('#alchemyOverlay');
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
              Alchemy.AjaxErrorHandler($dialog, XMLHttpRequest.status, textStatus, errorThrown);
            },
            complete: function(jqXHR, textStatus) {
              Alchemy.enableButton('.disabled.button');
            }
          });
        },
        close: function() {
          $dialog.remove();
        }
      });
    }