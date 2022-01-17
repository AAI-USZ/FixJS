function(event)
  {
    this.last_method = event.method;
    this._current_request = new cls.NetworkLoggerRequest(this);
    this.requests_responses.push(this._current_request);
    this._current_request._update_event_request(event);
  }