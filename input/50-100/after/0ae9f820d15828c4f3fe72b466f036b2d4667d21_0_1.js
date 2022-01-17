function(text) {
        if (skk.roman.length > 0) {
          skk.preedit += text;
          skk.caret += text.length;
        } else {
          skk.okuriPrefix = okuriPrefix;
          skk.okuriText = text;
          skk.switchMode('conversion');
        }
      }