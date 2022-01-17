function _showAlternatives(key) {
    var alternatives, altMap, value, keyObj, uppercaseValue;
    var r = key ? key.dataset.row : -1, c = key ? key.dataset.column : -1;
    if (r < 0 || c < 0)
      return;

    // get alternatives from layout
    altMap = _currentLayout.alt || {};
    keyObj = _currentLayout.keys[r][c]; 
    value = keyObj.value;
    alternatives = altMap[value] || '';

    // in uppercase, look for other alternatives or use default's
    if (_isUpperCase) {
      uppercaseValue = _getUpperCaseValue(keyObj);
      alternatives = altMap[uppercaseValue] || alternatives.toUpperCase();
    }

    if(alternatives.indexOf(' ') != -1) {
      alternatives = alternatives.split(' ');
      // check just one item
      if (alternatives.length === 2 && alternatives[1] === '')
        alternatives.pop();
    } else {
      alternatives = alternatives.split('');
    }

    if (!alternatives.length)
      return;

    IMERender.showAlternativesCharMenu(key, alternatives);
    _showingAlternativesMenu = true;
    _keyWithMenu = key;

    // Locked limits
    _menuLockedArea = {
      top: getWindowTop(_keyWithMenu),
      bottom: getWindowTop(_keyWithMenu) + _keyWithMenu.scrollHeight,
      left: getWindowLeft(IMERender.menu),
      right: getWindowLeft(IMERender.menu) + IMERender.menu.scrollWidth
    };
    _menuLockedArea.width = _menuLockedArea.right - _menuLockedArea.left;
    _menuLockedArea.ratio = _menuLockedArea.width / IMERender.menu.children.length;
  }