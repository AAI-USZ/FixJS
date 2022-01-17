function _showAlternatives(key) {

    // Avoid alternatives of alternatives
    if (_isShowingAlternativesMenu)
      return;

    // Get the key object from layout
    var alternatives, altMap, value, keyObj, uppercaseValue;
    var r = key ? key.dataset.row : -1, c = key ? key.dataset.column : -1;
    if (r < 0 || c < 0 || r === undefined || c === undefined)
      return;
    keyObj = _currentLayout.keys[r][c];

    // Handle languages alternatives
    if (keyObj.keyCode === SWITCH_KEYBOARD) {
      IMERender.showKeyboardAlternatives(
        key,
        IMEManager.keyboards,
        _baseLayoutName,
        SWITCH_KEYBOARD
      );
      _isShowingAlternativesMenu = true;
      return;
    }

    // Handle key alternatives
    altMap = _currentLayout.alt || {};
    value = keyObj.value;
    alternatives = altMap[value] || '';

    // If in uppercase, look for other alternatives or use default's
    if (_isUpperCase) {
      uppercaseValue = _getUpperCaseValue(keyObj);
      alternatives = altMap[uppercaseValue] || alternatives.toUpperCase();
    }

    // Split alternatives
    if (alternatives.indexOf(' ') != -1) {
      alternatives = alternatives.split(' ');

      // Check just one item
      if (alternatives.length === 2 && alternatives[1] === '')
        alternatives.pop();

    } else {
      alternatives = alternatives.split('');
    }

    if (!alternatives.length)
      return;

    // The first alternative is ALWAYS the original key
    alternatives.splice(
      0, 0,
      _isUpperCase ? uppercaseValue : value
    );

    // Locked limits
    // TODO: look for [LOCKED_AREA]
    var top = getWindowTop(key);
    var bottom = getWindowTop(key) + key.scrollHeight;

    IMERender.showAlternativesCharMenu(key, alternatives);
    _isShowingAlternativesMenu = true;

    // Locked limits
    // TODO: look for [LOCKED_AREA]
    _menuLockedArea = {
      top: top,
      bottom: bottom,
      left: getWindowLeft(IMERender.menu),
      right: getWindowLeft(IMERender.menu) + IMERender.menu.scrollWidth
    };
    _menuLockedArea.width = _menuLockedArea.right - _menuLockedArea.left;
    _menuLockedArea.ratio =
      _menuLockedArea.width / IMERender.menu.children.length;

  }