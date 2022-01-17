function() {
        game[callback]();
        console.debug("Timeout kicked in"); 
        overlay.remove();
      }