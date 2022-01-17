function(e) {
            Utils.debug('Session save error' + e);
            hub.publish("saveFailedToPouch","session");
          }