function(){
        if(isTextarea || editor.is('wysiwyg')){
          return editor.currentMode.clicked();
        }
      }