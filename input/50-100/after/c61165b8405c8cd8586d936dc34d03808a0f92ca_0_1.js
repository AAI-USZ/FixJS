function(e) {
      if (! $.browser.safari) {
        e.preventDefault();
        if( $(this).hasClass('sprite_q_menu_pauseforsfHover') ) {
          $(this).find("ul").toggle();
        }
      }
  }