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
    if (event.data && event.data.content)
    {
      this.responsebody = event.data;
    }
  };

  this._update_event_responsebody = function(event)
  {
    if (!event.mimeType) { this.body_unavailable = true; }
    this.responsebody = event;
    // todo: check how to distinguish body_unavailable and empty body.
  };

  this._update_event_urlunload = function(event)
  {
    this.is_unloaded = true;
  };

  // The following sync changes on Entry.
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