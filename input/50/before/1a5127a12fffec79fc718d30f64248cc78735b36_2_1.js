function(content) {
    var matches = content.match(/\n/);
    var newLineCount = matches === null ? 1 : matches.length+1;
    console.debug("content [" + content + "] has newLineCount [" + newLineCount + "]");
    return newLineCount;
  }