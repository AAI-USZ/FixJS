function(event)
  {
    // Sometimes we see no "response" event before we see responseheader,
    // therefore have to init NetworkLoggerResponse here. See CORE-43935.
    if (!this._current_response)
    {
      if (this._current_request)
      {
        this._current_request.was_responded = true;
      }
      this._current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this._current_response);
    }
    this._current_response._update_event_responseheader(event);
    // todo: should _guess_response_type here? if there was a Content-Type response-header, pick it from there.
  }