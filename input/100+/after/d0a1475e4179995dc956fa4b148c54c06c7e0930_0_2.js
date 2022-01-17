function(element, type, fn, custom_event_name) {
    if (custom_event_name)
      custom_event_name = custom_event_name.replace('.','_');
    
    var event = { 
      type: type, 
      target: element, 
      origin: fn,
      custom_event: custom_event_name,
      preventDefault: function() { return; },
      cancelBubble: function() { return; },
      stopPropogation: function() { return; }
    };
    
    if (custom_event_name) {
      if (!elation.events.events[custom_event_name])
        elation.events.events[custom_event_name] = [];
      
      //console.log('BINDING '+type+' -> '+custom_event_name);
    }
    
    if (!elation.events.events[type])
      elation.events.events[type] = [];
    
    elation.events.events[type].push(event);
    /*
    if (custom_event_name) {
      if (!elation.events.events[custom_event_name])
        elation.events.events[custom_event_name] = [];
      
      elation.events.events[custom_event_name].push(event);
    }
    */
  }