function (editor, callback) {
      var id = getDocumentId(editor);
      
      this._doPost(editor, connectorUrl + '?action=UPDATE&documentId=' + id + "&revisionNumber=" + getSavedRevision(editor), null, function (success, responseJson) {
        if (!success) {
          displayMessage('SEVERE', responseJson.errorMessage);
          if ((typeof callback) == 'function') {
            callback();
          }
        } else {        
          switch (responseJson.status) {
            case "OK":
              var revisions = responseJson.revisions;
              if (revisions && revisions.length > 0) {
                var text = getCurrentContent(editor);
                var revisionNumber = getSavedRevision(editor);
                var patchedText = text;
                var conflict = false;
                
                for (var i = 0, l = revisions.length; i < l; i++) {
                  var revision = revisions[i];
                  if (revision.patch) {
                    var patchResult = applyPatch(revision.patch, patchedText);
                    if (patchResult.applied) {
                      patchedText = patchResult.patchedText;
                    } else {
                      displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
                      conflict = true;
                      break;
                    }
                  }
                  
                  if (revision.properties) {
                    var changedProperties = new Array();
                    for (var i = 0, l = revision.properties.length; i < l; i++) {
                      updateCurrentProperty(editor, revision.properties[i].name, revision.properties[i].value);
                      changedProperties.push({
                        name: revision.properties[i].name,
                        value: revision.properties[i].value
                      });
                    }
                    
                    updateSavedProperties(editor, getCurrentProperties(editor));
                    
                    editor.fire('ckcPropertiesChanged', {
                      changedProperties: changedProperties,
                      source: "remote"
                    });
                  }
                  
                  revisionNumber = revision.number;
                }
                
                if (conflict == false) {
                  updateSavedRevision(editor, revisionNumber);
    
                  if (patchedText !== text) {
                    updateSavedContent(editor, patchedText);
                    updateCurrentContent(editor, patchedText);
                    editor.fire('ckcContentChanged', {
                      source: "remote"
                    });
                  }
                } else {
                  revert(editor);
                }
              }
            break;
            case "CONFLICT":
              displayMessage('WARNING', lang.conflictWhileApplyingUpdates);
              revert(editor);
            break;
            default:
              displayMessage('SEVERE', lang.unknownServerError);
            break;
          }
  
          if ((typeof callback) == 'function')
            callback();
        }
      });
    }