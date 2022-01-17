function(e) {
      e.preventDefault();
      if( $(this).hasClass('sprite_q_menu_pauseforsfHover') ) {
        $(this).find("ul").toggle();
      }
  }