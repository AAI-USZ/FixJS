function onInputBoxKeyPress(e) {
      var typedValue = String.fromCharCode(e.which || e.keyCode);
      inputBuffer.push(typedValue);
    }