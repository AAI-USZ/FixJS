function(err) {
          // Retry the connect
          setTimeout(function() {
            retryFunction(_self, _numberOfRetriesDone, _retryInMilliseconds, _numberOfTimes, _command, _db_command, _options, _callback);
          }, _retryInMilliseconds);
        }