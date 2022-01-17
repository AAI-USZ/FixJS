function buildKeyboardColumns(key, ncolumn) {

        var keyChar = key.value;
        if (flags.uppercase)
          keyChar = flags.getUpperCaseValue(key);

        var code = key.keyCode || keyChar.charCodeAt(0);
        var className = '';
        var ratio = key.ratio || 1;

        //key with + key separation in rems
        var keyWidth = ratio;
        var dataset = [{'key': 'row', 'value': nrow}];
        dataset.push({'key': 'column', 'value': ncolumn});
        dataset.push({'key': 'keycode', 'value': code});

        if (language && code == -3) {
          dataset.push({'key': 'keyboard', 'value': language});
        }

        content += buildKey(keyChar, className, keyWidth, dataset);

      }