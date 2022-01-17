function() {
            // Do a freaking ping
            __executeQueryCommand(self, replSetGetStatusCommand, {readPreference:ReadPreference.SECONDARY_PREFERRED}, function(_replerr, _replresult) {
              // Handle the HA
              if(_replerr == null) {
                self.serverConfig.validateReplicaset(_replresult);
              }
            })
          }