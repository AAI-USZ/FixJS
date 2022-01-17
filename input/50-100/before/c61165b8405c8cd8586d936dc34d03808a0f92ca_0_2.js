function(e) {
      e.preventDefault();
      if( $(this).hasClass('sprite_q_queuesfHover') ) {
        $(this).find("ul").toggle();
      }
  }