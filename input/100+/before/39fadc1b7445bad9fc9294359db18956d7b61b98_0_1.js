function(type, fn, element, data) {
    if (typeof type == 'object') {
      fn = elation.utils.arrayget(type, 'fn') || fn;
      element = elation.utils.arrayget(type, 'element') || element;
      data = elation.utils.arrayget(type, 'data') || data;
      type = elation.utils.arrayget(type, 'type');
    }

    console.log('FIRING: ' + type, fn, element, data);
    if (!type)
      return false;
    
    var list = this.events[type],
        events = [],
        event;
    
    if (!list) {
      this.events[type] = [];
      return;
    }
    
    // gather all the events associated with this event type
    for (var i=0; i<list.length; i++) {
      event = list[i];
      
      if (fn || element) {
        if ((fn && event.origin !== fn) || (element && event.target !== element))
          continue;
        else
          events.push(event);
      } else {
        events.push(event);
      }
    }
    
    // fire each event
    for (var i=0; i<events.length; i++) {
      var event = events[i];
      
      if (data)
        event.data = data;
      
      if (event.origin) {
        if (typeof event.origin == 'function')
          event.origin(event);
        else if (typeof event.origin.handleEvent != 'undefined')
          event.origin.handleEvent(event);
      }
    }
    
    return events;
  }