function(index, Element) {
      var data = $(this).data('swipePanel');
      if (data) {
        data.components.rootSize = $(this)[data.options._dimension]();
      }
    }