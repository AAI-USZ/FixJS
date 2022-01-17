function (url, data, callback) {
      var xhr = this.createXMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      
      if (!CKEDITOR.env.webkit) {
        // WebKit refuses to send these headers as unsafe
        xhr.setRequestHeader("Content-length", data ? data.length : 0);
        xhr.setRequestHeader("Connection", "close");
      }
      
      if (getToken())
        xhr.setRequestHeader("Authorization", "token " + getToken());
      
      xhr.onreadystatechange = function() { 
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
      };
      
      xhr.send(data);
    }