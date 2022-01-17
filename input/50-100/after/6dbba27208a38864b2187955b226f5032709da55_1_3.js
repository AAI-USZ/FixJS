function(event)
  {
    if (this.current_request)
    {
      this.current_request.was_responded_to = true;
    }
    this.last_responsecode = event.responseCode;
    this.error_in_last_response = /^[45]/.test(this.last_responsecode);
    this.current_response = new cls.NetworkLoggerResponse(this);
    this.requests_responses.push(this.current_response);
    this.current_response._update_event_response(event);
  }