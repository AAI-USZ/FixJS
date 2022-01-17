function() { 
        if(xhr.readyState == 4) {
          if (xhr.status == 200) {
            if (instanceDestroyed == true)
              return;
            
            var response = xhr.responseText;
            if (!response) {
              // Request was probably aborted...
              return;
            }
            
            try {
              var responseJson = eval("(" + response + ")");
              if ((typeof callback) == 'function')
                callback(true, responseJson);
            } catch (e)  {
              displayMessage('SEVERE', lang.couldNotParseServerResponse);
            }
          } else {
            if ((typeof callback) == 'function') {
              var message = xhr.responseText;
              if (xhr.status == 403) {
                displayMessage('SEVERE', lang.permissionDenied);
              } 
              
              if (!message) {
                message = lang.unknownServerError;
              }

              callback(false, {
                errorMessage: message,
                errorCode: xhr.status
              });
            }
          }
        }
      }