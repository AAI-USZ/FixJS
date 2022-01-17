function(event) {
        clearTimeout(timeoutId);
        self.game[callback]();
        console.debug("Removing overlay"); 
        overlay.remove();
      }