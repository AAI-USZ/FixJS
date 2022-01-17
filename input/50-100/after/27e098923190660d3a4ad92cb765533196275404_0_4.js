function() {
          removeListener(isIE ? msgTarget : window, 'message', onDie);
          if (cb) doPost({ a: 'error', d: 'client closed window' });
          cb = undefined;
          // explicitly close the window, in case the client is trying to reload or nav
          try { window.close(); } catch (e) { }
        }