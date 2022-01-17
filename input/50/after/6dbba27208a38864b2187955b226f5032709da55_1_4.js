function(event)
  {
    if (!this.current_request)
    {
      // There should always be a request by now, but keep the data anyway.
      this.current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this.current_request);
    }
    this.current_request._update_event_requestfinished(event);
  }