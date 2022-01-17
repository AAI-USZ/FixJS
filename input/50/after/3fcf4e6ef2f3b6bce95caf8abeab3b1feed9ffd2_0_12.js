function(){
        if(isTextarea || editor.is('wysiwyg')){
          editor.focus();
          return editor.currentMode.clicked(editor);
        }
      }