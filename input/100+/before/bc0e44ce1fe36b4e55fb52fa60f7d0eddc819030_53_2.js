function _sendNormalKey(keyCode) {

    // Redirects to IME
    if (_requireIME() &&
        _currentLayoutMode == LAYOUT_MODE_DEFAULT) {

      _getCurrentEngine().click(keyCode);
      return;
    }

    // Send the key
    window.navigator.mozKeyboard.sendKey(0, keyCode);

    // Return to default layout after pressinf an uppercase
    if (_isUpperCase &&
        !_isUpperCaseLocked && _currentLayoutMode === LAYOUT_MODE_DEFAULT) {

      _isUpperCase = false;
      _draw(
        _baseLayoutName, _currentInputType,
        _currentLayoutMode, _isUpperCase
      );
    }
  }