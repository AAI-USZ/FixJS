function () {
      if (instanceDestroyed == false) {
        if (editor.mode == 'wysiwyg') {
          if (pollingPaused == false) {
            save(editor, function () {
              checkUpdates(editor);
            });
          }
        } else {
          checkUpdates(editor);
        }
      }
    }