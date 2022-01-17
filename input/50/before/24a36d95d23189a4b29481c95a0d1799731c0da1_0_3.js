function(assertion) {
            if (callback) {
              callback(assertion);
              callback = null
            }
          }