function _onMouseUp(evt) {
    _isPressing = false;

    if (!_currentKey)
      return;

    clearTimeout(_deleteTimeout);
    clearInterval(_deleteInterval);
    clearTimeout(_menuTimeout);

    _hideAlternatives(true);

    var target = _currentKey;
    var keyCode = parseInt(target.dataset.keycode);
    if (!_isNormalKey(target))
      return;

    // IME candidate selected
    var dataset = target.dataset;
    if (dataset.selection) {

      if (_requireIME()) {
        _getCurrentEngine().select(target.textContent, dataset.data);
      } else if (_requireSuggestion()) {
        _getCurrentSuggestionEngine().select(target.textContent, dataset.data);
      }

      IMERender.highlightKey(target);
      _currentKey = null;
      return;
    }

    IMERender.unHighlightKey(target);
    _currentKey = null;

    // Delete is a special key, it reacts when pressed not released
    if (keyCode == KeyEvent.DOM_VK_BACK_SPACE)
      return;

    // Reset the flag when a non-space key is pressed,
    // used in space key double tap handling
    if (keyCode != KeyEvent.DOM_VK_SPACE)
      _isContinousSpacePressed = false;

    // Handle composite key (key that sends more than one code)
    var sendCompositeKey = function sendCompositeKey(compositeKey) {
        compositeKey.split('').forEach(function sendEachKey(key) {
          window.navigator.mozKeyboard.sendKey(0, key.charCodeAt(0));
        });
    }

    var compositeKey = target.dataset.compositekey;
    if (compositeKey) {
      sendCompositeKey(compositeKey);
      return;
    }

    // Handle normal key
    switch (keyCode) {

      // Layout mode change
      case BASIC_LAYOUT:
      case ALTERNATE_LAYOUT:
      case KeyEvent.DOM_VK_ALT:
        _handleSymbolLayoutRequest(keyCode);
      break;

      // Switch language (keyboard)
      case SWITCH_KEYBOARD:

        // If the user has specify a keyboard in the menu,
        // switch to that keyboard.
        if (target.dataset.keyboard) {
          _baseLayoutName = target.dataset.keyboard;

        // If the user is releasing the switch keyboard key while
        // showing the alternatives, do nothing.
        } else if (_isShowingAlternativesMenu) {
          break;

        // Cycle between languages (keyboard)
        } else {
          var keyboards = IMEManager.keyboards;
          var index = keyboards.indexOf(_baseLayoutName);
          index = (index + 1) % keyboards.length;
          _baseLayoutName = IMEManager.keyboards[index];
        }

        _reset();
        _draw(
          _baseLayoutName, _currentInputType,
          _currentLayoutMode, _isUpperCase
        );

        if (_requireIME()) {
          if (_getCurrentEngine().show) {
            _getCurrentEngine().show(_currentInputType);
          }
        }

        break;

      // Expand / shrink the candidate panel
      case TOGGLE_CANDIDATE_PANEL:
        if (IMERender.ime.classList.contains('candidate-panel')) {
          IMERender.ime.classList.remove('candidate-panel');
          IMERender.ime.classList.add('full-candidate-panel');
        } else {
          IMERender.ime.classList.add('candidate-panel');
          IMERender.ime.classList.remove('full-candidate-panel');
        }
        break;

      // Shift or caps lock
      case KeyEvent.DOM_VK_CAPS_LOCK:

        // Already waiting for caps lock
        if (_isWaitingForSecondTap) {
          _isWaitingForSecondTap = false;

          _isUpperCase = _isUpperCaseLocked = true;
          _draw(
            _baseLayoutName, _currentInputType,
            _currentLayoutMode, _isUpperCase
          );

        // Normal behavior: set timeout for second tap and toggle caps
        } else {

          _isWaitingForSecondTap = true;
          window.setTimeout(
            function() {
              _isWaitingForSecondTap = false;
            },
            _kCapsLockTimeout
          );

          // Toggle caps
          _isUpperCase = !_isUpperCase;
          _isUpperCaseLocked = false;
          _draw(
            _baseLayoutName, _currentInputType,
            _currentLayoutMode, _isUpperCase
          );
        }

        // Keyboard updated: all buttons recreated so event target is lost.
        var capsLockKey = document.querySelector(
          'button[data-keycode="' + KeyboardEvent.DOM_VK_CAPS_LOCK + '"]'
        );
        IMERender.setUpperCaseLock(
          capsLockKey,
          _isUpperCaseLocked ? 'locked' : _isUpperCase
        );

      break;

      // Return key
      case KeyEvent.DOM_VK_RETURN:
        if (_requireIME() &&
            _currentLayoutMode === LAYOUT_MODE_DEFAULT) {
          _getCurrentEngine().click(keyCode);
          break;
        }

        window.navigator.mozKeyboard.sendKey(keyCode, 0);

        if (_requireSuggestion())
          _getCurrentSuggestionEngine().click(keyCode);

        break;

      // Space key need a special treatmen due to the point added when double
      // tapped.
      case KeyEvent.DOM_VK_SPACE:
        if (_isWaitingForSpaceSecondTap &&
            !_isContinousSpacePressed) {

          if (_requireIME() &&
            _currentLayoutMode === LAYOUT_MODE_DEFAULT) {

            //TODO: need to define the inteface for double tap handling
            //_getCurrentEngine().doubleTap(keyCode);
            break;
          }

          // Send a delete key to remove the previous space sent
          window.navigator.mozKeyboard.sendKey(KeyEvent.DOM_VK_BACK_SPACE,
                                               0);

          // Send the . symbol followed by a space
          window.navigator.mozKeyboard.sendKey(0, 46);
          window.navigator.mozKeyboard.sendKey(0, keyCode);

          _isWaitingForSpaceSecondTap = false;

          // A flag to prevent continous replacement of space with "."
          _isContinousSpacePressed = true;
          break;
        }

        // Program timeout for second tap
        _isWaitingForSpaceSecondTap = true;
        window.setTimeout(
          (function removeSpaceDoubleTapTimeout() {
            _isWaitingForSpaceSecondTap = false;
          }).bind(this),
          _kSpaceDoubleTapTimeout
        );

        // After all: treat as a normal key
        _sendNormalKey(keyCode);
        break;

      // Normal key
      default:
        var offset = _getOffset(evt);
        _currentWordComposer.add(keyCode, offset.x,
           _getKeyCoordinateY(offset.y));
        _sendNormalKey(keyCode);
        break;
    }
  }