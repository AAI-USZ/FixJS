function(event)
  {
    if (this._current_response)
      this._current_response._update_event_responsefinished(event);

    if (event.data && event.data.mimeType)
      this.mime = event.data && event.data.mimeType;

    this._guess_response_type();
  }