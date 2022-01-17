function (editor, callback) {
      var contentDirty = editor.checkDirty();
      var properties = getCurrentProperties(editor);
      var propertiesDirty = !hashCompare(properties, getSavedProperties(editor));
      var snapshot = null;
      var original = null;
      var propertiesDiff = null;
      
      if (contentDirty||propertiesDirty) {
        var id = getDocumentId(editor);
        var data = '';
        
        if (contentDirty) {
          original = getSavedContent(editor);
          snapshot = getCurrentContent(editor);
          if (original != snapshot) {
            var diff = makeDiff(original, snapshot);
            var patch = makePatch(original, diff);
            data = 'patch=' + encodeURIComponent(patch);
          } else {
            contentDirty = false;
          }
        }
        
        if (propertiesDirty) {
          propertiesDiff = hashDiff(properties, getSavedProperties(editor));
          var propertiesPatch = hashSerialize(propertiesDiff);
          data = (data ? data + '&' : '') + 'properties=' + encodeURIComponent(propertiesPatch);
        }
        
        if (contentDirty||propertiesDirty) {
          var cancelled = false;
          
          if (contentDirty) {
            if (editor.fire('ckcContentChange', {
              source: "local",
              content: snapshot
            }) === true) {
              cancelled = true;
              updateCurrentContent(editor, getSavedContent(editor));
            }
          }
          
          if (propertiesDirty) {
            if (editor.fire('ckcPropertiesChange', {
              source: "local",
              properties: properties
            }) === true) {
              cancelled = true;
              var oldProperties = getSavedProperties(editor);
              for (var propertyName in oldProperties) {
                updateCurrentProperty(editor, propertyName, oldProperties[propertyName]);
              }
            }
          }
          
          if (cancelled == false) {
            this._doPost(editor, connectorUrl + '?action=SAVE&documentId=' + id + "&revision=" + getSavedRevision(editor), data, function (success, responseJson) {
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
            });
          } else {
            if ((typeof callback) == 'function')
              callback();
          }
        } else {
          if ((typeof callback) == 'function')
            callback();
        }
      } else {
        if ((typeof callback) == 'function')
          callback();
      }
    }