function onerror(e) {
        var e2;
        try {
          s.player.stop();
          s.player.drawSplash();
        } catch(e) { e2 = e; };
        s.errorsElm.style.display = 'block';
        s.errorsElm.innerHTML = '<strong>Error:&nbsp;</strong>'+e.message;
        if (reportErr) {
          if (console && console.error) {
            console.error(e.stack);
            if (e2) console.error(e2.stack);
          }
          reportErr = false;
        }
        //throw e;
    }