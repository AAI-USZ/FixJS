function buildKeyboardColumns(key, ncolumn) {
        var specialCodes = [
          KeyEvent.DOM_VK_BACK_SPACE,
          KeyEvent.DOM_VK_CAPS_LOCK,
          KeyEvent.DOM_VK_RETURN,
          KeyEvent.DOM_VK_ALT,
          KeyEvent.DOM_VK_SPACE
        ];
        var hasSpecialCode = specialCodes.indexOf(key.keyCode) > -1;

        var keyChar = key.value;
        if (flags.uppercase && !(key.keyCode < 0 || hasSpecialCode))
          keyChar = layout.upperCase[key.value] || key.value.toUpperCase();

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