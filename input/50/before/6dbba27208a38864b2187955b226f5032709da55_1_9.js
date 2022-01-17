function(event)
  {
    // "The used mime type. This may be different from the mime type advertised in the HTTP headers."
    // Todo: So this can mean that there was no response, this is better represented through "!saw_responsefinished" though,
    // or that it was somehow invalid? Not so sure.
    if (!event.mimeType) { this.body_unavailable = true; }
    // event is of type ResourceData here.
    this.responsebody = event;
    // todo: check how to distinguish body_unavailable and empty body.
  }