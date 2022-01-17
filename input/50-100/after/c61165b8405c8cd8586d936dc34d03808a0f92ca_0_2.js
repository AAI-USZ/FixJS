function(e) {
      if (! $.browser.safari) {
        e.preventDefault();
        if( $(this).hasClass('sprite_q_queuesfHover') ) {
          $(this).find("ul").toggle();
        }
      }
  }