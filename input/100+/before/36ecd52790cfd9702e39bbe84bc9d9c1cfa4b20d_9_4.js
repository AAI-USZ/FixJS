function(eventname, eventdata)
  {
    if (eventname == "urlload")
    {
      this.url = eventdata.url;
      this.urltype = eventdata.urlType;
      // fixme: complete list
      this.urltypeName = {0: "Unknown", 1: "HTTP", 2: "HTTPS", 3: "File", 4: "Data" }[eventdata.urlType];
      this._humanize_url();
    }
    else if (eventname == "urlfinished")
    {
      if (!this.url)
      {
        this.url = eventdata.url;
      }
      this.result = eventdata.result;
      this.mime = eventdata.mimeType;
      this.encoding = eventdata.characterEncoding;
      this.size = eventdata.contentLength || 0;
      this.finished = true;
      this._guess_type();
      this._humanize_url();
    }
    else if (eventname == "response")
    {
      // If it's one of these, it's not a real resource.
      if ([200, 206, 304].indexOf(eventdata.responseCode) == -1)
      {
        this.invalid = true;
      }
    }
    else if (eventname == "urlredirect")
    {
      this.invalid = true;
    }
    else
    {
      opera.postError("got unknown event: " + eventname);
    }
  }