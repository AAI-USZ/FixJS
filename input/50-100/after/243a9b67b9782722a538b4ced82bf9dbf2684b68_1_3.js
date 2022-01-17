function() {
      if(1.2*$(window).scrollTop() >= $(document).height() - $(window).height()) {
          load_and_inc_offset(kid, 1);
      }
  }