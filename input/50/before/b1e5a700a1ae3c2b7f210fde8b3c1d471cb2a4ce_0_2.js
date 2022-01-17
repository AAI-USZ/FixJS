function(e) {
                  Utils.debug('Datalist save error' + e);
                  hub.publish("saveFailedToPouch","datalist");
                }