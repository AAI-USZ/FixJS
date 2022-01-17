function pressedEnter(editor){
    var list = editor.currentNodes.list, replacement;

    if(list && /(u|o)l/i.test(list.tag)){ // only headings
      textileMode.getSelection(editor);
      if(ME.holdShift){
        replacement = " <br> ";
      } else {
        replacement = "\n" + listTypes[list.tag] + " ";
      }
      textileMode.replaceSelection(editor, replacement, false);
      return false;
    }
  }