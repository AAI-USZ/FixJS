function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.pressed(editor, e.keyCode);
        }
      }