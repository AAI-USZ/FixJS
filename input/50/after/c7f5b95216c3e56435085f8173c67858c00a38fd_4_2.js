function(event) {
        clearTimeout(timeoutId);
        game[callback]();
        console.debug("Removing overlay"); 
        overlay.remove();
      }