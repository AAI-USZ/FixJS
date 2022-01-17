function(match){
    if(['whitespace', 'dot', 'not'].indexOf(t.lastToken) === -1){
      reportError('no whitespace before "' + match + '". found "' + t.lastMatch + '" instead.' );
    }
  }