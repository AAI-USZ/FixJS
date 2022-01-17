function(event)
  {
    this.current_responsecode = event.responseCode;
    this.error_in_current_response = /^[45]/.test(this.current_responsecode);
    this._current_response = new cls.NetworkLoggerResponse(this);
    this.requests_responses.push(this._current_response);
    this._current_response._update_event_response(event);
  }