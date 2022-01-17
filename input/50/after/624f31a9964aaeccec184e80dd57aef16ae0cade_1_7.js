function(editor){
    if(editor.is('wysiwyg')){
      editor.changeMode(editor.dataType);
    } else {
      editor.changeMode('wysiwyg');
    }
    return true;
  }