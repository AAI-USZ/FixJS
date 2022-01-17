function(event)
  {
    if (!this._current_response)
    {
      // This should mean there wasn't a request, but it was fetched over GetResource.
      this._current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this._current_response);
    }
    this._current_response._update_event_responsebody(event);
  }