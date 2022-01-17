function(event)
  {
    this.result = event.result;
    this.mime = event.mimeType;
    this.encoding = event.characterEncoding;
    this.size = event.contentLength;
    this.is_finished = true;
    // Responses keep duplicates of the finished state. It's only relevant on the last one though.
    if (this.current_response)
      this.current_response._update_event_urlfinished(event);

    this._guess_response_type();
    this._humanize_url();
  }