function buildKeyboardColumns(key, ncolumn) {

        var keyChar = key.value;
        var overrides = layout[flags.inputType + 'Overrides'];

        // Handle uppercase
        if (flags.uppercase) {
          keyChar = getUpperCaseValue(key);
        }

        // Handle override
        var code;
        if (overrides && overrides[keyChar]) {
          keyChar = overrides[keyChar];
          code = keyChar.charCodeAt(0);

        } else {
          code = key.keyCode || keyChar.charCodeAt(0);
        }

        var className = isSpecialKey(key) ? 'special-key' : '';
        var ratio = key.ratio || 1;

        var keyWidth = placeHolderWidth * ratio;
        var dataset = [{'key': 'row', 'value': nrow}];
        dataset.push({'key': 'column', 'value': ncolumn});
        dataset.push({'key': 'keycode', 'value': code});
        if (key.compositeKey) {
          dataset.push({'key': 'compositekey', 'value': key.compositeKey});
        }

        content += buildKey(keyChar, className, keyWidth + 'px', dataset);

      }