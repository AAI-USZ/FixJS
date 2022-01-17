function(data, status, xhr) {

          w.editor.isNotDirty = 1; // force clean state

          w.d.show('message', {

            title: 'Document Saved',

            msg: currentDoc+' was saved successfully.'

          });

        }