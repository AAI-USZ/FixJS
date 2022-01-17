function _showAlternatives(key) {
    var alternatives, altMap, defaultKey, currentKey;
    var r = key.dataset.row || -1, c = key.dataset.column || -1;
    if (r < 0 || c < 0)
      return;

    // get alternatives from layout
    altMap = Keyboards[_baseLayout].alt || {};
    defaultKey = Keyboards[_baseLayout].keys[r][c];
    currentKey = _currentLayout.keys[r][c];

    // in uppercar, look for current value or the uppercase of the default
    if (_isUpperCase) {
      if (altMap[currentKey.value] !== undefined) {
        alternatives = altMap[currentKey.value] || '';
      } else {
        alternatives = (altMap[defaultKey.value] || '').toUpperCase();
      }

    // in other case, look for default value
    } else {
      alternatives = altMap[currentKey.value] || '';
    }
    if(alternatives.indexOf(' ') != -1)
      alternatives = alternatives.split(' ');
    else
      alternatives = alternatives.split('');

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