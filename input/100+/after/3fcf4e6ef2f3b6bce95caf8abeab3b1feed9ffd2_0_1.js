function(editor, boundary) {
      var textArea = editor.textArea, text = textArea.val(), boundaryPosition, subString;
      textArea.focus();

      // gecko & webkit
      editor.initSelectionProperties();

      // TODO does this introduce some edgecases? Eating newlines
      // move this to initSelectionProperties?
      if(text[editor.selectionEnd-1] === "\n"){
        editor.selectionEnd -= 1;
      }

      if(boundary) {
        // find left boundary
        boundaryPosition = Math.max(text.lastIndexOf(boundary, editor.selectionStart), text.lastIndexOf("\n", editor.selectionStart));
        if(boundaryPosition !== -1) {
          editor.boundaryStart = boundaryPosition + 1;
        } else {
          editor.boundaryStart = 0;
        }
        
        // find right boundary, first limit the text to the
        // next new line
        boundaryPosition = text.indexOf("\n", editor.selectionEnd); 
        if(boundaryPosition === -1) {
          subString = text.slice(editor.boundaryStart);
        } else {
          subString = text.slice(editor.boundaryStart, boundaryPosition);
        }

        // Then find the next boundary
        boundaryPosition = 0;
        do{
          boundaryPosition = subString.indexOf(boundary, boundaryPosition + 1);
        } while(boundaryPosition !== -1 && editor.selectionEnd > editor.boundaryStart + boundaryPosition);

        // when it doesn't exist, extend the selection to the
        // paragraph end
        if(boundaryPosition === -1) {
          boundaryPosition = subString.length;
        }
        editor.boundaryEnd = editor.boundaryStart + boundaryPosition;
      }
      editor.boundaryDistance = boundaryPosition;
      return text.slice(editor.boundaryStart, editor.boundaryEnd);
    }