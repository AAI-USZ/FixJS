function(e) {
                        Utils.debug('Corpus save error' + e);
                        hub.publish("saveFailedToPouch","corpus");
                      }