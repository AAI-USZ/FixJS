function(e) {
                  Utils.debug('Datalist save error');
                  Utils.debug(e);
                  hub.publish("saveFailedToPouch","datalist");
                }