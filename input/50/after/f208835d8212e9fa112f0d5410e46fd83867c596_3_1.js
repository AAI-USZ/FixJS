function pb_init(element) {
      var scroller = (typeof element == 'object') ?
          element : document.querySelector(element);
      style = scroller.style;
    }