function(event)
  {
    // event.mimeType is the used mime type here.
    if (!event.mimeType) { this.no_used_mimetype = true; }
    this.responsebody = event;
  }