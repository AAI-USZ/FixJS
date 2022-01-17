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
    var key = keyevent.key.toLowerCase();
    var okuriPrefix = (skk.roman.length > 0) ? skk.roman[0] : key;
    skk.processRoman(key, romanTable, function(text) {
        if (skk.roman.length > 0) {
          skk.preedit += text;
          skk.caret += text.length;
        } else {
          skk.okuriPrefix = okuriPrefix;
          skk.okuriText = text;
          skk.switchMode('conversion');
        }
      });
    if (skk.currentMode == 'preedit') {
      // We should re-calculate the okuriPrefix since the 'roman' can be
      // changed during processRoman -- such like 'KanJi' pattern.
      skk.okuriPrefix = (skk.roman.length > 0) ? skk.roman[0] : key;
      skk.switchMode('okuri-preedit');
    }
    return true;
  }

  var processed = skk.processRoman(keyevent.key.toLowerCase(), romanTable,
                                   function(text) {
      skk.preedit = skk.preedit.slice(0, skk.caret) +
        text + skk.preedit.slice(skk.caret);
      skk.caret += text.length;
    });

  if (skk.preedit.length > 0 && keyevent.key == '>') {
    skk.roman = '';
    skk.preedit += '>';
    skk.switchMode('conversion');
  } else if (!processed) {
    console.log(keyevent);
    skk.preedit = skk.preedit.slice(0, skk.caret) +
      keyevent.key + skk.preedit.slice(skk.caret);
    skk.caret += keyevent.key.length;
  }
  return true;
}