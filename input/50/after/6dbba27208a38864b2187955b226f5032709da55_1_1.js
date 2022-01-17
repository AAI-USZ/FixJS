function(event)
  {
    this.is_unloaded = true;
    if (this.current_response)
      this.current_response._update_event_urlunload(event);
  }