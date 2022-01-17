function () {
      if (isExistingInstance(editor)) {
        if (editor.mode == 'wysiwyg') {
          if (getPollingPaused(editor) == false) {
            save(editor, function () {
              checkUpdates(editor);
            });
          }
        } else {
          checkUpdates(editor);
        }
      }
    }