function scanForMatch(editor, r){
    var text = editor.textArea.val(),
    match = r.exec(text);
    if(r.lastIndex === 0){
      return;   // TODO escalate this return to break the caller too
    }
    while(r.lastIndex < editor.selectionStart){
      match = r.exec(text);
    }

    // needed for the replaceSelection call
    editor.setSelectionRange(r.lastIndex - match[0].length, r.lastIndex);

    return match;
  }