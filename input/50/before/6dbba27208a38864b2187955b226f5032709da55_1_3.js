function(event)
  {
    if (!this._current_request)
    {
      // This means we didn't see a request before that, CORE-47076
      this._current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this._current_request);
    }
    this._current_request._update_event_requestheader(event);
  }