function(index, Element) {
      var data = $(this).data('swipePanel');
      if (data) {
        data.components.root
          .unbind('.startSlide')
          .unbind('.slide')
          .unbind('.stopSlide')
          .append(data.components.container.children());
        data.components.container.remove();
        $(this).data('swipePanel', null);
      }
    }