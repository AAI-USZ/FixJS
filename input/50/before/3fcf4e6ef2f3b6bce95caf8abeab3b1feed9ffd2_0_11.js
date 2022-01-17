function(e){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.released(e.keyCode);
        }
      }