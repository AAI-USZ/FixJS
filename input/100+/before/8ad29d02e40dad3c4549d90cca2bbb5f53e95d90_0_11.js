function () {
          diffMatchPatch = new diff_match_patch();
          connectorUrl = editor.config.ckc.connectorUrl;
          messageHandler = editor.config.ckc.messageHandler;
          
          updateDocumentId(editor.config.ckc.documentId);

          editor.addCommand('ckcsave', {
            exec : function(editor) {
              save(editor);
            }
          });
          
          editor.addCommand('ckcrevert', {
            exec : function(editor) {
              if (editor.mode == 'wysiwyg') {
                revert(editor);
              } else {
                displayMessage('WARNING', lang.cannotRevertDocumentNotWysiwygMode);
              }
            }
          });
          
          editor.on("destroy", function (e) {
            instanceDestroyed = true;
          });
          
          if (getDocumentId()) {
            CKCConnector.init(editor, function () {
              CKCConnector.loadDocument(editor, function () {
                checkUpdates(editor);
              });
            });
          }
          
          if (editor.config.ckc.unsavedWarningInterval) {
            checkUnsaved(editor);
          }
        }