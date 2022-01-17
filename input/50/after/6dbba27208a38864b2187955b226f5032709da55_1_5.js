function(event)
  {
    if (!this.current_response)
    {
      // This should mean there wasn't a request, but it was fetched over GetResource.
      this.current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this.current_response);
    }
    this.current_response._update_event_responsebody(event);
  }