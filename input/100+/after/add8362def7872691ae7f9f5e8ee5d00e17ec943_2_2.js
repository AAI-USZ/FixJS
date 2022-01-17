function() {
            // Force close if we are disconnected
            if(self._state == 'disconnected') {
              self.close();
              return;
            }

            var replSetGetStatusCommand = DbCommand.createAdminDbCommandSlaveOk(self, {replSetGetStatus:1}, {});
            // Do a freaking ping
            __executeQueryCommand(self, replSetGetStatusCommand, {readPreference:ReadPreference.SECONDARY_PREFERRED}, function(_replerr, _replresult) {
              // Force close if we are disconnected
              if(self._state == 'disconnected') {
                self.close(true);
                return;
              }

              // Handle the HA
              if(_replerr == null) {
                self.serverConfig.validateReplicaset(_replresult, self.auths);
              }
            })
          }