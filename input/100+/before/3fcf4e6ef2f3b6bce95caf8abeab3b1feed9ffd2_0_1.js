function(boundary) {
      var textArea = this.textArea, text = textArea.val(), boundaryPosition, subString;
      textArea.focus();

      // gecko & webkit
      this.scrollPosition = textArea.scrollTop;
      this.selectionStart = textArea[0].selectionStart;
      this.selectionEnd = textArea[0].selectionEnd;

      if(text[this.selectionEnd-1] === "\n"){
        this.selectionEnd -= 1;
      }

      if(boundary) {
        // find left boundary
        boundaryPosition = Math.max(text.lastIndexOf(boundary, this.selectionStart), text.lastIndexOf("\n", this.selectionStart));
        if(boundaryPosition !== -1) {
          this.selectionStart = boundaryPosition + 1;
        } else {
          this.selectionStart = 0;
        }
        
        // find right boundary, first limit the text to the
        // next new line
        boundaryPosition = text.indexOf("\n", this.selectionEnd); 
        if(boundaryPosition === -1) {
          subString = text.slice(this.selectionStart);
        } else {
          subString = text.slice(this.selectionStart, boundaryPosition);
        }

        // Then find the next boundary
        boundaryPosition = 0;
        do{
          boundaryPosition = subString.indexOf(boundary, boundaryPosition + 1);
        } while(boundaryPosition !== -1 && this.selectionEnd > this.selectionStart + boundaryPosition);

        // when it doesn't exist, extend the selection to the
        // paragraph end
        if(boundaryPosition === -1) {
          boundaryPosition = subString.length;
        }
        this.selectionEnd = this.selectionStart + boundaryPosition;
      }
      this.selection = text.slice(this.selectionStart, this.selectionEnd);
      return this.selection;
    }