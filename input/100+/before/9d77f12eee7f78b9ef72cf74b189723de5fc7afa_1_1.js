f{
  var unlisted_events = ["responsebody", "urlunload"];

  var CLASSNAME_BLOCKED = "blocked";
  var CLASSNAME_REQUEST = "request";
  var CLASSNAME_WAITING = "waiting";
  var CLASSNAME_RECEIVING = "receiving";
  var CLASSNAME_IRREGULAR = "irregular";

  /*  // gap_def format: 
  {
     classname: type of sequence,
     sequences: {
       from_event_name: {
         to_event_name_one: string,
         to_event_name_two: string
       ]
     }
   } */
  
  var gap_defs = {
    "urlload": {
        "request": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_SCHEDULING,
          classname: CLASSNAME_BLOCKED
        },
        "urlfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_READING_LOCAL_DATA,
          classname: CLASSNAME_BLOCKED
        },
        // The response-phase can be closed without ever seeing a response event, for 
        // example because the request was aborted. See CORE-43284.
        "responsefinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_CLOSING_RESPONSE_PHASE,
          classname: CLASSNAME_BLOCKED
        }
    },
    "requestretry": {
        "request": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_SCHEDULING,
          classname: CLASSNAME_BLOCKED
        }
    },
    "responsefinished": {
        "urlfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_PROCESSING_RESPONSE,
          classname: CLASSNAME_BLOCKED
        }
        // responsefinished can occur twice, see CORE-43284. CI 277 has the fix.
    },
    "urlredirect": {
        "urlfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_READING_LOCAL_DATA,
          classname: CLASSNAME_BLOCKED
        },
        // This probably means that the request is closed because it was decided to redirect instead of waiting for a response
        "responsefinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_CLOSING_RESPONSE_PHASE,
          classname: CLASSNAME_BLOCKED
        }
    },
    "requestheader": {
        "requestfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_WRITING_REQUEST_BODY,
          classname: CLASSNAME_REQUEST
        }
    },
    "request": {
        "requestheader": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_WRITING_REQUEST_HEADER,
          classname: CLASSNAME_REQUEST
        },
        "requestfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_WRITING_REQUEST_BODY,
          classname: CLASSNAME_REQUEST
        }
    },
    "requestfinished": {
        "response": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_WAITING_FOR_RESPONSE,
          classname: CLASSNAME_WAITING
        },
        "responsefinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_CLOSING_RESPONSE_PHASE,
          classname: CLASSNAME_WAITING
        }
    },
    "response": {
        "responseheader": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_READING_RESPONSE_HEADER,
          classname: CLASSNAME_RECEIVING
        }
    },
    "responseheader": {
        "responsefinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_READING_RESPONSE_BODY,
          classname: CLASSNAME_RECEIVING
        },
        // Occurs when a 100-Continue response was sent. In this timespan the client has
        // ignored it and waits for another response to come in. See CORE-43264.
        "response": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_WAITING_FOR_RESPONSE,
          classname: CLASSNAME_WAITING
        },
        // For example on a HEAD request, the url is finished after headers came in
        "urlfinished": {
          title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_PROCESSING,
          classname: CLASSNAME_BLOCKED
        }
      }
  };

  // What is not defined as it's own case by the above, but it terminated by 
  // urlredirect, requestretry or urlfinished, will be defined regardless of the preceding event

  /* // gap_def_to_phase format: 
  {
     classname: type of sequence,
     sequences: {
       to_event_name: string
     }
   } */
  var gap_defs_to_phase = {
    "urlredirect": {
      title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_REDIRECTING,
      classname: CLASSNAME_BLOCKED
    },
    "requestretry": {
      title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_ABORT_RETRYING,
      classname: CLASSNAME_IRREGULAR
    },
    "urlfinished": {
      title: ui_strings.S_HTTP_EVENT_SEQUENCE_INFO_ABORTING_REQUEST,
      classname: CLASSNAME_IRREGULAR
    }
  };

  this.update = function(eventname, eventdata)
  {
    var updatefun = this["_update_event_" + eventname];

    if (!this.events.length)
    {
      this.starttime = eventdata.time;
      if (this.context_starttime)
        this.starttime_relative = this.starttime - this.context_starttime;
      else
        this.starttime_relative = 0;

      var d = new Date(this.starttime);
      var h = String(d.getHours()).zfill(2);
      var m = String(d.getMinutes()).zfill(2);
      var s = String(d.getSeconds()).zfill(2);
      var ms = String(d.getMilliseconds()).zfill(3);
      this.start_time_string = h + ":" + m + ":" + s + "." + ms;
    }

    // unlisted_events are not relevant to the loading flow and are not stored
    if (!unlisted_events.contains(eventname))
    {
      this.endtime = eventdata.time;
      this._add_event(eventname, eventdata);
    }

    if (updatefun)
    {
      updatefun.call(this, eventdata);
    }
    else
    {
      opera.postError("got unknown event: " + eventname);
    }
  };

  this._update_event_urlload = function(event)
  {
    // When this is stored, properties inherited from URI can be accessed.
    this.url = event.url;

    this.urltype = event.urlType;
    this.document_id = event.documentID;
    if (event.loadOrigin)
      this.load_origin_name = cls.ResourceManager["1.2"].LoadOrigin[event.loadOrigin].toLowerCase();

    this.urltype_name = cls.ResourceManager["1.2"].UrlLoad.URLType[event.urlType];
    this._humanize_url();
    this._guess_response_type(); // may not be correct before mime is set, but will be guessed again when it is
  };

  this._update_event_urlunload = function(event)
  {
    this.is_unloaded = true;
    if (this._current_response)
      this._current_response._update_event_urlunload(event);
  };

  this._update_event_urlfinished = function(event)
  {
    this.result = event.result;
    this.mime = event.mimeType;
    this.encoding = event.characterEncoding;
    this.size = event.contentLength;
    this.is_finished = true;
    // Responses keep duplicates of the finished state. It's only relevant on the last one though.
    if (this._current_response)
      this._current_response._update_event_urlfinished(event);

    this._guess_response_type();
    this._humanize_url();
  };

  this._update_event_request = function(event)
  {
    this.last_method = event.method;
    this._current_request = new cls.NetworkLoggerRequest(this);
    this.requests_responses.push(this._current_request);
    this._current_request._update_event_request(event);
  };

  this._update_event_requestheader = function(event)
  {
    if (!this._current_request)
    {
      // This means we didn't see a request before that, CORE-47076
      this._current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this._current_request);
    }
    this._current_request._update_event_requestheader(event);
  };

  this._update_event_requestfinished = function(event)
  {
    if (!this._current_request)
    {
      // There should always be a request by now, but keep the data anyway.
      this._current_request = new cls.NetworkLoggerRequest(this);
      this.requests_responses.push(this._current_request);
    }
    this._current_request._update_event_requestfinished(event);
  };

  this._update_event_requestretry = function(event)
  {
    // This means on the next request with event.toRequestID, we won't 
    // make a new entry, but a new NetworkLoggerRequest on the same entry.
    this.last_requestID = event.toRequestID;
  };

  this._update_event_response = function(event)
  {
    if (this._current_request)
    {
      this._current_request.was_responded = true;
    }
    this.last_responsecode = event.responseCode;
    this.error_in_last_response = /^[45]/.test(this.last_responsecode);
    this._current_response = new cls.NetworkLoggerResponse(this);
    this.requests_responses.push(this._current_response);
    this._current_response._update_event_response(event);
  };

  this._update_event_responseheader = function(event)
  {
    // Sometimes we see no "response" event before we see responseheader,
    // therefore have to init NetworkLoggerResponse here. See CORE-43935.
    if (!this._current_response)
    {
      if (this._current_request)
      {
        this._current_request.was_responded = true;
      }
      this._current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this._current_response);
    }
    this._current_response._update_event_responseheader(event);
    // todo: should _guess_response_type here? if there was a Content-Type response-header, pick it from there.
  };

  this._update_event_responsefinished = function(event)
  {
    if (this._current_response)
      this._current_response._update_event_responsefinished(event);

    if (event.data && event.data.mimeType)
      this.mime = event.data && event.data.mimeType;

    this._guess_response_type();
  };

  this._update_event_responsebody = function(event)
  {
    if (!this._current_response)
    {
      // This should mean there wasn't a request, but it was fetched over GetResource.
      this._current_response = new cls.NetworkLoggerResponse(this);
      this.requests_responses.push(this._current_response);
    }
    this._current_response._update_event_responsebody(event);
  };

  this._update_event_urlredirect = function(event)
  {
    // This does not add any information, the event is only used to change the requestID
  };

  this._guess_response_type = function()
  {
    // The first guess is made based on file extension. No response is needed for that.
    // The current response is updated though, at the time it will be the correct one.
    // Multiple responses can get different types in this way.
    if (!cls || !cls.ResourceUtil)
      return;

    // For "application/octet-stream" we check by extension even though we have a mime
    if (!this.mime || this.mime.toLowerCase() === "application/octet-stream")
      this.type = cls.ResourceUtil.extension_type_map[this.extension];
    else
      this.type = cls.ResourceUtil.mime_to_type(this.mime);

    if (this._current_response)
      this._current_response._update_mime_and_type(this.mime, this.type);
  };

  this._humanize_url = function()
  {
    this.human_url = this.url;
    if (this.urltype == cls.ResourceManager["1.2"].UrlLoad.URLType.DATA)
    {
      if (this.type)
      {
        this.human_url = this.type + " data URI";
      }
      else
      {
        this.human_url = "data URI";
      }
    }
  };

  this.get_gap_def = function(gap)
  {
    var def = gap_defs[gap.from_event.name] &&
              gap_defs[gap.from_event.name][gap.to_event.name];

    if (!def)
      def = gap_defs_to_phase[gap.to_event.name];

    if (!def)
      opera.postError(ui_strings.S_DRAGONFLY_INFO_MESSAGE +
            "Unexpected event sequence between " + gap.from_event.name + " and " + gap.to_event.name);

    return def;
  };

  this._add_event = function(eventname, eventdata)
  {
    var evt = {
      name: eventname,
      time: eventdata.time,
      request_id: eventdata.requestID
    };
    if (this.events.length)
    {
      var gap = {
        from_event: this.events.last,
        to_event: evt,
        val: evt.time - this.events.last.time
      };
      var gap_def = this.get_gap_def(gap);
      gap.val_string = gap.val.toFixed(2) + " ms";
      gap.classname = gap_def && gap_def.classname || CLASSNAME_IRREGULAR;
      gap.title = gap_def && gap_def.title || "";

      this.event_sequence.push(gap);
    }
    this.events.push(evt);
  };

  this.__defineGetter__("current_response_has_responsebody", function()
  {
    return Boolean(this._current_response && this._current_response.responsebody);
  });

  this.__defineGetter__("duration", function()
  {
    return (this.events.length && this.endtime - this.starttime) || 0;
  });

  this.__defineGetter__("waiting_time", function()
  {
    var waiting_time = this.event_sequence.filter(helpers.eq("classname", CLASSNAME_WAITING))
                                          .sum(helpers.prop("val"));
    return waiting_time || 0;
  });

  this.__defineGetter__("touched_network", function()
  {
     return Boolean(this._current_request);
  });

};
