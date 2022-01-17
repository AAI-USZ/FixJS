function listen(target, type, listener){
      var noWrap = arguments[3], //don't show the internally used "noWrap" argument
        once = arguments[4],
        emulated = _events.emulated,
        eventNamespace = '',
        savedSelector = target,
        arResults,
        i, l, e, o, //iterator, length for looping, event object
        listeners,
        listenerContainer;
    
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, _.toArray([listen, _.isString(target)], arguments));
    }
    
    //we don't accept the asterisk in this method
    type = (type == '*') ? null : type;
    
    //if we don't have all the arguments we need..
    if(!target || !listener || !type){
      //compose an error description string
      var strErrDesc =  'Error: DDP -> F -> addEvent: Event target or listener or type missing. ' +
                        '\nTarget: ' + (target ? (target.id || target.className || savedSelector || 'none') : savedSelector || 'none') +
                        '\nType: "' + (eventNamespace ? eventNamespace + '.' + type : type) + '"' +
                        '\nListener: "' + (listener ? listener.toString().substr(0, 100).replace('\n', '') : 'none') + '"';
                        //arguments.callee.caller.arguments.callee.caller.toString()
      //try to log the error to the console
      try{ console.log(strErrDesc); }catch(e){}
      //return null to indicate that there was a problem adding the listener
      return 0;
    }
    
    //separate the namespace from the event type, if both were included
    if(type.indexOf('.') > -1){
      eventNamespace = type.split('.');
      type = eventNamespace.pop();
      eventNamespace = eventNamespace.join('.');
    }
    //console.log('ns', eventNamespace, 'ty', type);
    
    //get the current listener container or create a new one
    listenerContainer = _.getData(target, '__listeners__') || _.setData(target, '__listeners__', {});
    //get the listeners array if it exists and check if it's an array, if it's not then
    //create a new array and assign it to both the listener container and our local variable "listeners"
    listeners = (_.isArray(listeners = listenerContainer[type])) ? listeners : listenerContainer[type] = [];
  
    
    //emulate events that are in the "events.emulate" object (if the browser doesn't support them)
    //mark the element as having the emulation set up or not (so we don't have to test it again)
    if(listeners.emulate === undefined && emulated[type] && (listeners.emulate = !_events.supported(type, target))){
      //add any prerequisite emulated events (ie. mouseenter emulation depends on the mouseleave event and vise-versa)
      emulated[type].prerequisiteEvents && emulated[type].prerequisiteEvents.split(' ').forEach(function(emuType){
        //add a listener for the prerequisite event type (and don't return a CruxEvent object to the listener, just the plain browser event)
        _events.listen(target, emulated[emuType].attachToEvent, emulated[emuType].fn, true);
      });
      //if it's a one-time event //set it as such
      emulated[type].isLatch && _events.latch(target, type);
     //add the listener that performs the emulation to the event that can be used to trigger the emulation
      _events.listen(emulated[type].attachToElement || target, emulated[type].attachToEvent, function(e){ return emulated[type].fn && emulated[type].fn.call(target, e); }, true);
    }
    
    //if this is a one-time event (such as window 'load'), and it has already been fired,
    //(supposed to be a single equals sign, we're assigning the value to e, then testing if it's truthy)  
    if(e = _events.latchClosed(target, type)){
      //then execute the event listener right away (using the event target as "this" and passing a new event object to it).
      listener.call(target, e);
      return; //indicate a one time event re-fire
    }
    
    //if there are no listeners in the array or the new listener isn't present in the array
    //TODO: figure out if we need to allow adding a listener for each namespace
    if(listeners.length == 0 || !listeners.some(function(o){ return o.fn == listener; })){
      //just push the listener onto the end of the array
      listeners.push({fn: listener, namespace: eventNamespace, once: !!once, noWrap: !!noWrap});
    }
    //the listener has already been added
    else{
      //return zero
      return 0;
    }
    
    //w3c standard browsers
    //add the event listener. specify false for the last argument to use the bubbling phase (to mirror IE's limitation to only bubble)
    //(if the addEventListener method returns false, move to the next event model)
    if(!listeners.hooked){
      if(target.addEventListener && target.addEventListener(type, _executeListeners, false) !== false){
        //return the event model used to add the event listener
        listeners.__eventModel__ = 1;
      }
      //it's Internet Explorer and we already detected event model 2 or the event is supported
      else if(target.attachEvent && (listeners.__eventModel__ == 2 || _events.supported(type, target))){
        //attach the event using the IE event model (bubble only)
        target.attachEvent('on' + type, listeners.scopeFixer = function(e){ _executeListeners.call(target, e || window.event); });
        //if it's the first time a listener has been added
        //add a listener to the window onunload event so that we can detach this event when the window unloads
        //(try to relase event listener memory on old IEs)
        window.attachEvent('onunload', function(){ target.detachEvent('on' + type, listeners.scopeFixer); });
        //the event model used to add the event listener
        listeners.__eventModel__ = 2;
      }
      //if nothing has worked yet... fallback to the AERM method
      else{
        //if this is a DOMElement or the window object and if the
        //object doesn't have our "on" + type function assigned to "fireAERMListeners"
        //(which means this is the first time an aerm listener has been added for this type)
        if(_.isElement(target, true, true)){
          //record the old value (in case someone manually assigned a listener already, or it was in the HTML)
          var fnOldStyleFunction = target['on' + type];
          //assign our listener
          target['on' + type] = (listeners.scopeFixer = function(e){ _executeListeners.call(target, e || window.event); });
          //and if the old function is 
          if(typeof fnOldStyleFunction == 'function'){
            //add the old manual style event listener (global namespace)
            listen(target, type, fnOldStyleFunction, true);
          }
        }
        //record the event model used to attach the listener
        listeners.__eventModel__ = 3;
      }
      listeners.hooked = true;
    }

    return 1;
  }