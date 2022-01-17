function _draw(baseLayout, inputType, layoutMode, uppercase) {
    baseLayout = baseLayout || _baseLayout;
    inputType = inputType || _currentInputType;
    layoutMode = layoutMode || _currentLayout;
    uppercase = uppercase || false;

    _currentLayout = _buildLayout(baseLayout, inputType, layoutMode);

    if (_severalLanguages())
      IMERender.draw(_currentLayout, baseLayout, _onScroll, {uppercase:uppercase});
    else
      IMERender.draw(_currentLayout, undefined, _onScroll, {uppercase:uppercase});
  }