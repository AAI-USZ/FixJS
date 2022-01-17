function (editor, callback) {
      var id = getDocumentId(editor);
      
      this._doPost(editor, connectorUrl + '?action=INIT&documentId=' + id, null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', lang.initializationError);
        } else {
          if (responseJson.status == "OK") {
            setToken(editor, responseJson.token);
            
            if ((typeof callback) == 'function') {
              callback();
            }
          } else {
            displayMessage('SEVERE', lang.initializationError);
          }
        }
      });
    }