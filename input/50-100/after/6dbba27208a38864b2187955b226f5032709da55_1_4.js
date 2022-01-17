function(event)
  {
    // Sometimes we see no "response" event before we see responseheader,
    // therefore have to init NetworkLoggerResponse here. See CORE-43935.
    if (!this.current_response)
    {
      if (this.current_request)
      {
        this.current_request.was_responded_to = true;
      }
      this.current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this.current_response);
    }
    this.current_response._update_event_responseheader(event);
    // todo: should _guess_response_type here? if there was a Content-Type response-header, pick it from there.
  }