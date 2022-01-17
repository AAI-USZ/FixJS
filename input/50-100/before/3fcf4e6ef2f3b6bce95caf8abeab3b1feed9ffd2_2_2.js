function scanForMatch(mode,r){
    var match = r.exec(text);
    if(r.lastIndex === 0){
      return;   // TODO escalate this return to break the caller too
    }
    while(r.lastIndex < selectionStart){
      match = r.exec(text);
    }

    // needed for the replaceSelection call
    mode.selectionStart = r.lastIndex - match[0].length;
    mode.selectionEnd = r.lastIndex;
    return match;
  }