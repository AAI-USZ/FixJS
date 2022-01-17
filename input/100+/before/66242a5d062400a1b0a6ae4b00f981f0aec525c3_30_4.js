function(keyChar) {
      var keyCode = keyChar.keyCode || keyChar.charCodeAt(0);
      var dataset = [{'key': 'keycode', 'value': keyCode}];
      var label = keyChar.label || keyChar;
      if (label.length > 1)
        dataset.push({'key': 'compositekey', 'value': label});
      content += buildKey(label, '', cssWidth, dataset);
    }