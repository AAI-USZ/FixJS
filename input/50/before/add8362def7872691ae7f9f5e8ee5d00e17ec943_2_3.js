function(_replerr, _replresult) {
              // Force close if we are disconnected
              if(self._state == 'disconnected') {
                self.close();
                return;
              }

              // Handle the HA
              if(_replerr == null) {
                self.serverConfig.validateReplicaset(_replresult);
              }
            }