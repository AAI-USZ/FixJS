function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', responseJson.errorMessage);
          if ((typeof callback) == 'function') {
            callback();
          }
        } else {
          if (getSavedContent() != responseJson.content) {
            updateCurrentContent(editor, responseJson.content);
            updateSavedContent(responseJson.content);
            editor.fire('ckcContentChanged', {
              source: "remote"
            });
          }
          
          if (responseJson.properties && (responseJson.properties.length > 0)) {
            
            var changedProperties = new Array();
            for (var i = 0, l = responseJson.properties.length; i < l; i++) {
              updateCurrentProperty(editor, responseJson.properties[i].name, responseJson.properties[i].value);
              changedProperties.push({
                name: responseJson.properties[i].name,
                value: responseJson.properties[i].value
              });
            }
  
            updateSavedProperties(getCurrentProperties(editor));
            
            editor.fire('ckcPropertiesChanged', {
              changedProperties: changedProperties,
              source: "remote"
            });
          }
          
          updateSavedRevision(responseJson.revisionNumber);
          
          if ((typeof callback) == 'function') {
            callback();
          }
        }
      }