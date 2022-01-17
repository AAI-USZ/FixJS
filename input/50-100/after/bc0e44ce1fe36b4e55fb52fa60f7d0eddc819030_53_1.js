function _sendDelete(feedback) {
    if (feedback)
      IMEFeedback.triggerFeedback();
    if (_requireIME() &&
        _currentLayoutMode === LAYOUT_MODE_DEFAULT) {
      _getCurrentEngine().click(KeyboardEvent.DOM_VK_BACK_SPACE);
      return;
    }
    window.navigator.mozKeyboard.sendKey(KeyboardEvent.DOM_VK_BACK_SPACE, 0);

    if (_requireSuggestion())
      _getCurrentSuggestionEngine().click(KeyboardEvent.DOM_VK_BACK_SPACE);
  }