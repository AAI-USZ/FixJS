function _draw(baseLayout, inputType, layoutMode, uppercase) {
    baseLayout = baseLayout || _baseLayout;
    inputType = inputType || _currentInputType;
    layoutMode = layoutMode || _currentLayout;
    uppercase = uppercase || false;

    _currentLayout = _buildLayout(baseLayout, inputType, layoutMode, uppercase);

    if (_severalLanguages())
      IMERender.draw(_currentLayout, baseLayout, _onScroll);
    else
      IMERender.draw(_currentLayout, undefined, _onScroll);
  }