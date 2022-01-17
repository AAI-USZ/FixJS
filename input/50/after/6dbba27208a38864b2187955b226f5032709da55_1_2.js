function(event)
  {
    this.last_method = event.method;
    this.current_request = new cls.NetworkLoggerRequest(this);
    this.requests_responses.push(this.current_request);
    this.current_request._update_event_request(event);
  }