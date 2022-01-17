function(editor,action,target) {
      var item = toolbarItems[action],
      mode = editor.currentMode;

      // execute buttons clicked action
      (item[mode.id] || item).clicked(editor, target);
      
      // Update Preview in case something has changed
      if(action != "changeMode" && !editor.is("wysiwyg")) {
        mode.updatePreview(editor);
      }
    }