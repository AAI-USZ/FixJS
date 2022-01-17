function(event)
  {
    this.request_headers = event.headerList;

    for (var n=0, header; header = this.request_headers[n]; n++)
    {
      if (header.name.toLowerCase() == "content-type")
      {
        this.request_type = header.value;
        break;
      }
    }
    this.firstline = event.raw.split("\n")[0]; // todo: event.raw.split("\r\n")[0];
    // The body can be contained in event.raw.
    // At the time of the this event, it's possible that more than the header
    // has been written to the socket already.
    this.request_headers_raw = event.raw.split("\r\n\r\n")[0];
  }