function firstLine(editor, boundary){
    // lines has only one element
    var lines = textileMode.extendSelection(editor, boundary).split("\n").slice(0,1),
    lineLength = lines[0].length;
    editor.selectionEnd = editor.selectionStart + lineLength;
    // Ignore special textile tokens at the beginnig of the line
    eachLine(lines, function(i, lineStart, line){
      editor.setSelectionRange( editor.selectionStart + lineStart.length, editor.selectionEnd);
      lines[i] = line;
    });
    return lines[0];
  }