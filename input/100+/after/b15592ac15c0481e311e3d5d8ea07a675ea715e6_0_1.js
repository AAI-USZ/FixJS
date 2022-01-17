function (editor, callback) {
      var content = getCurrentContent(editor);
      var properties = getCurrentProperties(editor);
      
      if (editor.fire("ckcDocumentCreate", {
        content: content,
        properties: properties
      }) !== true) {
        var data = "content=" + encodeURIComponent(content) + '&properties=' + encodeURIComponent(hashSerialize(properties));
        this._doPost(connectorUrl + "?action=CREATE", data, function (success, responseJson) {
          if (!success) {
            displayMessage('SEVERE', lang.documentCreateError);
          } else {        
            switch (responseJson.status) {
              case "OK":
                updateSavedContent(content);
                updateDocumentId(responseJson.documentId);
                updateSavedRevision(responseJson.revisionNumber);
                setToken(responseJson.token);
                
                editor.fire("ckcDocumentCreated", {
                  content: content,
                  properties: properties
                });
    
                if ((typeof callback) == 'function')
                  callback();
              break;
              default:
                displayMessage('SEVERE', lang.unknownServerError);
              break;
            }
          }
        });
      }
    }