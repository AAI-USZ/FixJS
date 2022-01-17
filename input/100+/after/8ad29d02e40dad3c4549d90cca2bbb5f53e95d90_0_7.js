function (success, responseJson) {
              if (!success) {
                displayMessage('SEVERE', responseJson.errorMessage);
                if ((typeof callback) == 'function') {
                  callback();
                }
              } else {    
                switch (responseJson.status) {
                  case "OK":
                    if (responseJson.revisionNumber) {
                      if (contentDirty) {
                        updateSavedContent(editor, snapshot);
                        editor.fire('ckcContentChanged', {
                          source: "local"
                        });
                      }
                      
                      if (propertiesDirty) {
                        updateSavedProperties(editor, properties);
                        
                        var changedProperties = new Array();
                        
                        for (var property in propertiesDiff) {
                          changedProperties.push({
                            name: property,
                            value: propertiesDiff[property]
                          });
                        }
                        
                        editor.fire('ckcPropertiesChanged', {
                          changedProperties: changedProperties,
                          source: "local"
                        });
                      }
                      updateSavedRevision(editor, responseJson.revisionNumber);
                    }
                  break;
                  case "CONFLICT":
                    displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
                    revert(editor);
    //                updateCurrentContent(editor, original);
                  break;
                  default:
                    displayMessage('SEVERE', lang.unknownServerError);
                  break;
                }
                
                editor.resetDirty();
                
                if ((typeof callback) == 'function')
                  callback();
              }
            }