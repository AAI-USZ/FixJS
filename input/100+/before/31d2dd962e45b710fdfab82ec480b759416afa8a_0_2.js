function _buildLayout(baseLayout, inputType, layoutMode, uppercase) {

    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }

    var layout, l,
        switchKey,
        newKeys = [],
        ratio = 8;

    // these types force specific layouts
    if (inputType === 'number' || inputType === 'tel')
      return deepCopy(Keyboards[inputType + 'Layout']);

    // Clone the layout
    layout = deepCopy(Keyboards[baseLayout]);

    // Transform to uppercase
    if (uppercase) {
      layout.keys.forEach(function(row) {
        row.forEach(function(key) {
          var v = key.value;

          if (layout.upperCase && layout.upperCase[v]) {
            key.value = layout.upperCase[v];

          } else {
            key.value = key.value.toLocaleUpperCase();
          }
        });
      });
    }

    if (_severalLanguages() && !layout['hidesSwitchKey']) {
      // Switch keyboard key
      // ratio -= 1;
      newKeys.push({ value: '&#x1f310;', ratio: 1, keyCode: SWITCH_KEYBOARD });
    }

    // Switch ABC/SYMBOLS button
    if (!layout['disableAlternateLayout']) {
      switchKey = _getSwitchKey(layoutMode);
/*      if (severalLanguages === false)
         switchKey.ratio += 1;
*/
      newKeys.push(switchKey);
      // ratio -= switchKey.ratio;
    }
    // Text types specific keys
    if (!layout['typeInsensitive']) {
      newKeys = newKeys.concat(_getTypeSensitiveKeys(inputType, ratio, layout.textLayoutOverwrite));
    }

    // Return key
    newKeys.push({ value: '↵', ratio: 2, keyCode: KeyEvent.DOM_VK_RETURN });

    // TODO: Review this, why to always discard the last row?
    layout.keys.pop(); // remove last row
    layout.keys.push(newKeys);

    return layout;
  }