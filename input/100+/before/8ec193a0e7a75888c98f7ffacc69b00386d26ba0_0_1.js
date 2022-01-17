function onerror(e) {
        s.player.stop();
        s.player.drawSplash();
        s.errorsElm.style.display = 'block';
        s.errorsElm.innerHTML = '<strong>Error:&nbsp;</strong>'+e.message;
        if (reportErr) {
          if (console && console.error) {
            console.error(e.stack);
          }
          reportErr = false;
        }
        //throw e;
    }