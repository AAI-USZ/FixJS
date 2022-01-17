function (skk, keyevent) {
    if (keyevent.key == 'Enter') {
      return false;
    }

    if (keyevent.key == 'Backspace' && skk.roman.length > 0) {
      skk.roman = skk.roman.slice(0, skk.roman.length - 1);
      return true;
    }

    if (keyevent.key == 'q') {
      skk.processRoman('', romanTable, skk.commitText.bind(skk));
      skk.roman = '';
      skk.switchMode(
        (skk.currentMode == 'hiragana') ? 'katakana' : 'hiragana');
      return true;
    } else if (keyevent.key == 'Q') {
      skk.processRoman('', romanTable, skk.commitText.bind(skk));
      skk.roman = '';
      skk.switchMode('preedit');
      return true;
    } else if (keyevent.key == 'l') {
      skk.processRoman('', romanTable, skk.commitText.bind(skk));
      skk.roman = '';
      skk.switchMode('ascii');
      return true;
    } else if (keyevent.key == 'L') {
      skk.processRoman('', romanTable, skk.commitText.bind(skk));
      skk.roman = '';
      skk.switchMode('full-ascii');
      return true;
    } else if (keyevent.key == '/') {
      skk.processRoman('', romanTable, skk.commitText.bind(skk));
      skk.roman = '';
      skk.switchMode('ascii-preedit');
      return true;
    }
    if ((keyevent.key == 'Esc' ||
         (keyevent.key == 'g' && keyevent.ctrlKey)) && skk.roman.length > 0) {
      skk.roman = '';
      return true;
    } else if (keyevent.key.length != 1 ||
               keyevent.ctrlKey || keyevent.altKey) {
      return false;
    } else if (keyevent.shiftKey &&
               keyevent.key >= 'A' && keyevent.key <= 'Z') {
      skk.switchMode('preedit');
      skk.processRoman(
        keyevent.key.toLowerCase(), romanTable, function(text) {
          skk.preedit = skk.preedit.slice(0, skk.caret) +
            text + skk.preedit.slice(skk.caret);
          skk.caret += text.length;
        });
      return true;
    }

    return skk.processRoman(keyevent.key, table, skk.commitText.bind(skk));
  }