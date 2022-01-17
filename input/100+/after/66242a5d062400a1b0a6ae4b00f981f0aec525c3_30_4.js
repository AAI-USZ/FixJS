function(keyChar) {
      var keyCode = keyChar.keyCode || keyChar.charCodeAt(0);
      var dataset = [{'key': 'keycode', 'value': keyCode}];
      var label = keyChar.label || keyChar;
      var cssWidth =
        key.offsetWidth * (0.9 + 0.5 * (label.length - original.length));
      if (label.length > 1)
        dataset.push({'key': 'compositekey', 'value': label});
      content += buildKey(label, '', cssWidth + 'px', dataset);
    }