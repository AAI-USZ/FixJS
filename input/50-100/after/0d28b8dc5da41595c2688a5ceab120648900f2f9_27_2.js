function kc_showIME(type) {
      delete IMERender.ime.dataset.hidden;
      IMERender.ime.classList.remove('hide');

      _currentInputType = _mapType(type);
      _draw(
        _baseLayoutName, _currentInputType,
        _currentLayoutMode, _isUpperCase
      );

      if (_requireIME()) {
        if (_getCurrentEngine().show) {
          _getCurrentEngine().show(type);
        }
      }

      _prepareLayoutParams(_layoutParams);
      this.updateLayoutParams();

      _notifyShowKeyboard(true);
    }