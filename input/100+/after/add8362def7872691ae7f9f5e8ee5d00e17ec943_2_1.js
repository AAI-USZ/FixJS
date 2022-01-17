f      // Adjust the number of retries left
      _numberOfRetriesDone = _numberOfRetriesDone - 1;
      // Definitively restart
      if(err != null && _numberOfRetriesDone > 0) {
        _self._state = 'connecting';
        // Close the server config
        _serverConfig.close(function(err) {
          // Retry the connect
          setTimeout(function() {
            retryFunction(_self, _numberOfRetriesDone, _retryInMilliseconds, _numberOfTimes, _command, _db_command, _options, _callback);
          }, _retryInMilliseconds);
        });
      } else if(err != null && _numberOfRetriesDone <= 0) {
        _self._state = 'disconnected';
        // Force close the current connections
        _serverConfig.close(function(_err) {
          // Force close the current connections
          if(typeof _callback == 'function') _callback(err, null);
        });
      } else if(err == null && _self.serverConfig.isConnected() == true && Array.isArray(_self.auths) && _self.auths.length > 0) {
        _self._state = 'connected';
        // Get number of auths we need to execute
        var numberOfAuths = _self.auths.length;
        // Apply all auths
        for(var i = 0; i < _self.auths.length; i++) {
          _self.authenticate(_self.auths[i].username, _self.auths[i].password, {'authdb':_self.auths[i].authdb}, function(err, authenticated) {
            numberOfAuths = numberOfAuths - 1;

            // If we have no more authentications to replay
            if(numberOfAuths == 0) {
              if(err != null || !authenticated) {
                if(typeof _callback == 'function') _callback(err, null);
                return;
              } else {
                // Execute command
                command(_self, _db_command, _options, _callback);

                // Execute any backed up commands
                process.nextTick(function() {
                  // Execute any backed up commands
                  while(_self.commands.length > 0) {
                    // Fetch the command
                    var command = _self.commands.shift();
                    // Execute based on type
                    if(command['type'] == 'query') {
                      __executeQueryCommand(_self, command['db_command'], command['options'], command['callback']);
                    } else if(command['type'] == 'insert') {
                      __executeInsertCommand(_self, command['db_command'], command['options'], command['callback']);
                    }
                  }
                });
              }
            }
          });
        }
      } else if(err == null && _self.serverConfig.isConnected() == true) {
        _self._state = 'connected';
        // Execute command
        command(_self, _db_command, _options, _callback);

        process.nextTick(function() {
          // Execute any backed up commands
          while(_self.commands.length > 0) {
            // Fetch the command
            var command = _self.commands.shift();
            // Execute based on type
            if(command['type'] == 'query') {
              __executeQueryCommand(_self, command['db_command'], command['options'], command['callback']);
            } else if(command['type'] == 'insert') {
              __executeInsertCommand(_self, command['db_command'], command['options'], command['callback']);
            }
          }
        });
      } else {
        _self._state = 'connecting';
        // Force close the current connections
        _serverConfig.close(function(err) {
        // _self.serverConfig.close(function(err) {
          // Retry the connect
          setTimeout(function() {
            retryFunction(_self, _numberOfRetriesDone, _retryInMilliseconds, _numberOfTimes, _command, _db_command, _options, _callback);
          }, _retryInMilliseconds);
        });
      }
    });
