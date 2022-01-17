function(e) {
            Utils.debug('Session save error' );
            Utils.debug(e);
            hub.publish("saveFailedToPouch","session");
          }