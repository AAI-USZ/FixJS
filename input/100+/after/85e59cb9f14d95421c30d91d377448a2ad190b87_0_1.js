function(index, Element) {
      var data = $(this).data('swipePanel');
      if (data) {
        $(this)
          .unbind('.startSlide')
          .unbind('.slide')
          .unbind('.stopSlide');
        if (data.options.container) {
          data.options.container.css(data.options.container.data('origCSS'));
        } else {
          // if a custom container is not used, reset the structure back to normal
          data.components.root.append(data.components.container.children());
          data.components.container.remove();
        }
        $(this).data('swipePanel', null);
      }
    }