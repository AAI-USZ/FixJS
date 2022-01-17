function (editor, callback) {
      var contentDirty = editor.checkDirty();
      var properties = getCurrentProperties(editor);
      var propertiesDirty = !hashCompare(properties, getSavedProperties());
      var snapshot = null;
      var original = null;
      var propertiesDiff = null;
      
      if (contentDirty||propertiesDirty) {
        var id = getDocumentId();
        var data = '';
        
        if (contentDirty) {
          original = getSavedContent();
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
          propertiesDiff = hashDiff(properties, getSavedProperties());
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
              updateCurrentContent(editor, getSavedContent());
            }
          }
          
          if (propertiesDirty) {
            if (editor.fire('ckcPropertiesChange', {
              source: "local",
              properties: properties
            }) === true) {
              cancelled = true;
              var oldProperties = getSavedProperties();
              for (var propertyName in oldProperties) {
                updateCurrentProperty(editor, propertyName, oldProperties[propertyName]);
              }
            }
          }
          
          if (cancelled == false) {
            this._doPost(connectorUrl + '?action=SAVE&documentId=' + id + "&revision=" + getSavedRevision(), data, function (success, responseJson) {
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
                        updateSavedContent(snapshot);
                        editor.fire('ckcContentChanged', {
                          source: "local"
                        });
                      }
                      
                      if (propertiesDirty) {
                        updateSavedProperties(properties);
                        
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
                      updateSavedRevision(responseJson.revisionNumber);
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