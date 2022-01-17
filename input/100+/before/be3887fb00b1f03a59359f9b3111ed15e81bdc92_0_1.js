function preeditInput(skk, keyevent) {
  if (keyevent.key == ' ') {
    if (skk.roman == 'n') {
      skk.preedit += romanTable['nn'];
    }
    skk.roman = '';
    skk.switchMode('conversion');
    return true;
  }

  if (preeditKeybind(skk, keyevent)) {
    return true;
  }

  if (keyevent.key.length != 1) {
    // special keys -- ignore for now
    return false;
  }

  if (skk.preedit.length > 0 &&
      keyevent.shiftKey && 'A' <= keyevent.key && keyevent.key <= 'Z') {
    skk.okuriPrefix =
      (skk.roman.length > 0) ? skk.roman[0] : keyevent.key.toLowerCase();
    skk.processRoman(
      keyevent.key.toLowerCase(), romanTable, function(text) {
        if (skk.roman.length > 0) {
          skk.preedit += text;
          skk.caret += text.length;
        } else {
          skk.okuriText = text;
          skk.switchMode('conversion');
        }
      });
    if (skk.currentMode == 'preedit') {
      skk.switchMode('okuri-preedit');
    }
    return true;
  }

  var processed =
    skk.processRoman(keyevent.key.toLowerCase(), romanTable, function(text) {
      skk.preedit = skk.preedit.slice(0, skk.caret) +
        text + skk.preedit.slice(skk.caret);
      skk.caret += text.length;
    });

  if (skk.preedit.length > 0 && keyevent.key == '>') {
    skk.roman = '';
    skk.switchMode('conversion');
  } else if (!processed) {
    skk.preedit = skk.preedit.slice(0, skk.caret) +
      keyevent.key + skk.preedit.slice(skk.caret);
    skk.caret += text.length;
  }
  return true;
}