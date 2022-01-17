function (success, responseJson) {
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
        }