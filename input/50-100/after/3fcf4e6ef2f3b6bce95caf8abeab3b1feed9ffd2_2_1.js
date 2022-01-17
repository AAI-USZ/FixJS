function replaceEachLine(editor, boundary, functor){
    var lines = textileMode.extendSelection(editor, boundary).split("\n");

    eachLine(lines, function(i, lineStart, line){
      lines[i] = functor(lineStart, line);
    });
    
    textileMode.replaceSelection(editor, lines.join("\n"));
  }