function (success, responseJson) {
          if (!success) {
            displayMessage('SEVERE', lang.documentCreateError);
          } else {        
            switch (responseJson.status) {
              case "OK":
                updateSavedContent(editor, content);
                updateDocumentId(editor, responseJson.documentId);
                updateSavedRevision(editor, responseJson.revisionNumber);
                setToken(editor, responseJson.token);
                
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