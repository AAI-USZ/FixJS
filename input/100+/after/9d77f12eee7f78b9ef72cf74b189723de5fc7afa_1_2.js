function()
{
  this._update_event_response = function(event)
  {
    this.responsecode = event.responseCode;
  };

  this._update_event_responseheader = function(event)
  {
    this.response_headers = event.headerList;
    // The body can be contained in event.raw.
    // At the time of the this event, it's possible that more than the header
    // has been read from the socket already.
    this.response_headers_raw = event.raw.split("\r\n\r\n")[0];
  };

  this._update_event_responsefinished = function(event)
  {
    this.saw_responsefinished = true;
    if (event.data && event.data.content)
    {
      // event.data is of type ResourceData here.
      // todo: this does not set body_unavailable = true when there is no mimeType. does that make sense?
      this.responsebody = event.data;
    }
  };

  this._update_event_responsebody = function(event)
  {
    // "The used mime type. This may be different from the mime type advertised in the HTTP headers."
    // Todo: So this can mean that there was no response, this is better represented through "!saw_responsefinished" though,
    // or that it was somehow invalid? Not so sure.
    if (!event.mimeType) { this.body_unavailable = true; }
    // event is of type ResourceData here.
    this.responsebody = event;
    // todo: check how to distinguish body_unavailable and empty body.
  };

  this._update_event_urlunload = function(event)
  {
    this.is_unloaded = true;
  };

  // The following are to reflect changes that happened on Entry.
  this._update_event_urlfinished = function(event)
  {
    this.logger_entry_is_finished = true;
  };

  this._update_mime_and_type = function(mime, type)
  {
    // This could actually be per response too. But as only the last response has body, it can be on the entry.
    this.logger_entry_mime = mime;
    this.logger_entry_type = type;
  };
}