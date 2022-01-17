function(action,target) {
      var item = toolbarItems[action],
      editor = this.editor,
      mode = editor.currentMode;
      (item[mode.id] || item).clicked(editor, mode, target);
      // Update Preview in case something has changed
      if(action != "changeMode" && !editor.is("wysiwyg")) {
        mode.updatePreview();
      }
    }