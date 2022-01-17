function(event)
  {
    if (!this._current_request)
    {
      // There should always be a request by now, but keep the data anyway.
      this._current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this._current_request);
    }
    this._current_request._update_event_requestfinished(event);
  }