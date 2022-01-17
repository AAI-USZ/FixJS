function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.pressed(e.keyCode);
        }
      }