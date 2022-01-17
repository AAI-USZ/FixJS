function(content) {
    var matches = content.match(/\n/);
    var newLineCount = matches === null ? 1 : matches.length+1;
    return newLineCount;
  }