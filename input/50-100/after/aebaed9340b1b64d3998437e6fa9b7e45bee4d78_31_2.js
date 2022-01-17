function(event) 
  {
    if (!this._container)
      return;

    if (this._textarea &&
        !/^(?:input|textarea|button)$/i.test(event.target.nodeName) &&
        !event.target.hasTextNodeChild())
    {
      this._textarea.focus();
      this._current_scroll = null;
    }
    else
    {
      this._current_scroll = this._container.scrollTop;
    }
  }