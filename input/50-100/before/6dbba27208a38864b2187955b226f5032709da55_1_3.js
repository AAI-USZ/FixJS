function(event)
  {
    if (this._current_request)
    {
      this._current_request.was_responded = true;
    }
    this.last_responsecode = event.responseCode;
    this.error_in_last_response = /^[45]/.test(this.last_responsecode);
    this._current_response = new cls.NetworkLoggerResponse(this);
    this.requests_responses.push(this._current_response);
    this._current_response._update_event_response(event);
  }