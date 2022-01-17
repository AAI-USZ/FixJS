function(editor, mode){
    if(editor.is('wysiwyg')){
      editor.changeMode(editor.dataType);
    } else {
      editor.changeMode('wysiwyg');
    }
  }