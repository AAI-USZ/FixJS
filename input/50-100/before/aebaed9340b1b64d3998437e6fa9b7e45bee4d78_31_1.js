function(evt, target)
  {
    this.clear();
    var cursor_pos = this._textarea_handler.get_cursor();
    this._data.clear();
    this._textarea.focus();
    this._textarea_handler.put_cursor(cursor_pos);
    return false;
  }