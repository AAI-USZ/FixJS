function(editor,action,target) {
      var asynchronous,
      item = toolbarItems[action],
      mode = editor.currentMode;

      // execute buttons clicked action
      asynchronous = (item[mode.id] || item).clicked(editor, target);
      
      if(!asynchronous){
        editor.checkState();
        // Update Preview in case something has changed
        if( !editor.is("wysiwyg")) {
          mode.updatePreview(editor);
        }
      }
    }