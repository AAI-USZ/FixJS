function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', lang.initializationError);
        } else {
          if (responseJson.status == "OK") {
            setToken(responseJson.token);
            
            if ((typeof callback) == 'function') {
              callback();
            }
          } else {
            displayMessage('SEVERE', lang.initializationError);
          }
        }
      }