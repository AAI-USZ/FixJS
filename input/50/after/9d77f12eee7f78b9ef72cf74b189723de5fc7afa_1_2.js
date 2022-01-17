function(event)
  {
    this.saw_responsefinished = true;
    if (event.data && event.data.content)
    {
      // event.data is of type ResourceData here.
      // todo: this does not set body_unavailable = true when there is no mimeType. does that make sense?
      this.responsebody = event.data;
    }
  }