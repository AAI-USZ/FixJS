function onInputBoxKeyPress(e) {
      if(e.keyCode !== KEY.BACKSPACE) {
        var typedValue = String.fromCharCode(e.which || e.keyCode);
        inputBuffer.push(typedValue);
      }
    }