function(event)
  {
    if (!this.current_request)
    {
      // This means we didn't see a request before that, CORE-47076
      this.current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this.current_request);
    }
    this.current_request._update_event_requestheader(event);
  }