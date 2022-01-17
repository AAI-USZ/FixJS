function(match){
    if(['whitespace', 'dot'].indexOf(t.lastToken) === -1){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }
  }