function km_handleMouseDownEvent(keyCode) {
      if (Keyboards[_baseLayout].type == 'ime' &&
          _layoutMode == LAYOUT_MODE_DEFAULT) {
            this.currentEngine.click(keyCode);
            window.setTimeout(_updateTargetWindowHeight, 100);
            return;
          }

      window.navigator.mozKeyboard.sendKey(0, keyCode);

      if (_isUpperCase &&
          !_isUpperCaseLocked && _layoutMode === LAYOUT_MODE_DEFAULT) {
            _isUpperCase = false;
            _draw(_baseLayout, _currentInputType, _layoutMode, _isUpperCase);
          }
    }