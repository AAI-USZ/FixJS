function(container)
  {
    // reset all properties
    this._line_count = 0;
    this._line_found = false;
    this._target_line = 0;
    this._tops = [];
    var _ele = container.querySelectorAll('.'+HIGHLIGHTED_LINE_CLASSNAME)[0];
    if (_ele)
    {
      _ele.removeClass(HIGHLIGHTED_LINE_CLASSNAME)
    }
  }