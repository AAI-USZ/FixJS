function (editor, callback) {
      var content = encodeURIComponent(getCurrentContent(editor));
      var properties = encodeURIComponent(hashSerialize(getCurrentProperties(editor)));
      
      this._doPost(connectorUrl + "?action=CREATE&content=" + content + '&properties=' + properties, null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', lang.documentCreateError);
        } else {        
          switch (responseJson.status) {
            case "OK":
              updateSavedContent(content);
              updateDocumentId(responseJson.documentId);
              updateSavedRevision(responseJson.revisionNumber);
              setToken(responseJson.token);
  
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