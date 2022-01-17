function() {
        editor.ckc = {
          documentId : null,
          savedRevision : null,
          savedContent : null,
          savedProperties : null,
          token : null,
          pollingPaused: false
        };

        CKEDITOR.scriptLoader.load( editor.plugins.ckc.path + 'required/diff_match_patch.js' , function () {
          diffMatchPatch = new diff_match_patch();
          connectorUrl = editor.config.ckc.connectorUrl;
          messageHandler = editor.config.ckc.messageHandler;
         
          updateDocumentId(editor, editor.config.ckc.documentId);

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
          
          if (getDocumentId(editor)) {
            CKCConnector.init(editor, function () {
              CKCConnector.loadDocument(editor, function () {
                checkUpdates(editor);
              });
            });
          }
          
          if (editor.config.ckc.unsavedWarningInterval) {
            checkUnsaved(editor);
          }
        });
      }