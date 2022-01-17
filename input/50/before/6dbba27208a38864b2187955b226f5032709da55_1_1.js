function(event)
  {
    this.is_unloaded = true;
    if (this._current_response)
      this._current_response._update_event_urlunload(event);
  }