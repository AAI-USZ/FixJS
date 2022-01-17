function(status, data, update_callback, entry)
  {
    if (!this._current_context)
      return;

    entry.is_fetching_body = false;
    if (status)
    {
      // the object passed to _current_context represents empty event_data. will set body_unavailable.
      this._current_context.update("responsebody", {resourceID: entry.resource_id});
    }
    else
    {
      var msg = new cls.ResourceManager["1.2"].ResourceData(data);
      this._current_context.update("responsebody", msg);
    }
    // Update the view. This is only needed when the generic updating per event is paused.
    if (this.is_paused && update_callback)
      update_callback();

  }