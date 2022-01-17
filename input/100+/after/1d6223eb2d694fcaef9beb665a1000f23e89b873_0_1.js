function(){
  
//the function that will be called when the actual event is fired.
//for ie it will be called with the scope fixed so that the "this" is correct 
//and the event object is passed as the first argument 
function _executeListeners(ev){
  var r, o, listeners,
      objEvent = (ev),
      obj = _.getData(this, '__listeners__');
  
  if(!(objEvent instanceof _events.Event)){
    //TODO: circular reference between the cruxEvent and the nativeEvent objects....
    objEvent = ev.cruxEvent || new _events.Event;
  }
  
  !objEvent.normalized && objEvent.normalize(objEvent.nativeEvent || ev);
  objEvent.target = objEvent.target || this;
  objEvent.currentTarget = this;//_events.Event.prototype.converters.target(ev);
  //try{console.log(this, ev, objEvent);}catch(x){}
  //if the element has a listener container
  if(obj){
    
    //take a copy of the handlers that were effective at the time the event was fired
    listeners = _.toArray(obj[objEvent.type]);
    //execute the listeners in the order they were added
    for(var i=0, l=listeners.length; i<l; i++){
      o = listeners[i];
      //if immediate propagation has been stopped, break out of the for loop
      if(objEvent.immediateStopped && objEvent.immediateStopped()){
        break;
      }
      if(_events.namespaceMatch(objEvent.eventNamespace, o.namespace)){
        //encapsulate the execution of the listener inside a browser event
        if(o.once){ _events.unlisten(this, (o.namespace ? o.namespace + '.': '') + objEvent.type, o.fn); }
        //update the "listenerNamespace" property on the event object with the current listener namespace
        objEvent.listenerNamespace = o.namespace;
        //
        //r = o.fn.call(this, o.noWrap ? objEvent.nativeEvent : objEvent);
        //execute the listener and if it returns false, prevent the event default
        (r = _events.BEEP(o.fn, [o.noWrap ? objEvent.nativeEvent : objEvent], this)) === false && objEvent.prevent();
        //if it was the beforeunload event, they might try and return a string (used to prompt the user) 
        (objEvent.type === 'beforeunload' && _.isString(r)) && (objEvent.returnValue = r);
      }
    }
  }
  //if the crux event obejct returnValue was updated, update the native event object return value
  objEvent.nativeEvent.returnValue = objEvent.returnValue;
  //if this is the window object and we haven't already prevented the default action, execute the default actions function
  (this === window) && !objEvent.prevented() && _doDefaultActions(objEvent);
  //return the event return value
  return objEvent.returnValue;
}



function _doDefaultActions(e){
  var el = e.target,
      type = e.type,
      listenerContainer,
      listeners,
      actions, i, l;
  while(el){
    listeners = actions = null;
    listenerContainer = _.getData(el, '__listeners__');
    listenerContainer && (listeners = listenerContainer[type]);
    listeners && (actions = listeners.defaulActions);
    if(_.isArray(actions) && actions.length){
      for(i=0, l=actions.length; i< l; i++){
        //actions[i].call(el, e);
        _events.BEEP(actions[i], [e], el);
      }
    }
    el = el.parentNode;
  }
}
  

_.extend(_events, {
  //
  emptyListener: function(){},
  /***************************************************************/
  //---------------------------------------------------------------------------
  //_demux
  //takes arguments for the event methods and demultiplexes then from arrays,
  //collections and space separated strings, calling the "this" for each combination of arguments
  // eg. _demux.call(_listen, "div, .someClass", ")
  //---------------------------------------------------------------------------
  _demux: function _demux(fn, demuxTarget, targets, types){
    var successes = 0, i, il, j, jl;
    //resolve the selector string if that's what "targets" contains
    if(demuxTarget && !(targets = _.isString(targets) ? _dom.selectorEngine(targets) : targets)){ return 0; }
    if(_.isString(types)){
      //trim whitespace from either end and replace multiple whitespace chars with a single space
      types = _.str.trim(types).replace(/\s{2,}/g, ' ');
      //split space separated words into an array
      types = (types.indexOf(' ') > -1 ? types.split(' ') : types);
    }
    //if null or undefined, make it an asterisk
    types = (types == null) ? '*' : types;
    //an array of event types can be passed and each event type on the target element will have the listener added to it
    types = (_.isArray(types) || types instanceof _.Collection) ? types : [types];
    //an array of event targets can be passed and each target element will have the event type listener added to it
    targets = (!demuxTarget || _.isArray(targets) || targets instanceof _.Collection) ? targets : [targets];
    for(i=0, il=(demuxTarget ? targets.length : 1); i<il; i++){
      for(j=0, jl=types.length; j<jl; j++){
        successes += fn.apply(this, [(demuxTarget ? targets[i] : targets), types[j]].concat(_slice.call(arguments, 4)));
      }
    }
    return successes;
  },
  
  listenMany  : function listenMany(ar, types, listener){ return _events._demux.apply(null, _.toArray([_events.listen, true], arguments)); },
  unlistenMany: function unlistenMany(ar, types, listener){ return _events._demux.apply(null, _.toArray([_events.unlisten, true], arguments)); },
  fireMany    : function fireMany(ar, types, obj){ return _events._demux.apply(null, _.toArray([_events.fire, true], arguments)); },
  
  listenOnce : function listenOnce(target, type, listener){ return _events.listen(target, type, listener, arguments[3], true); },
  
  //listen  
  listen: function listen(target, type, listener){
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
  },
  
  
  //------------------------------------------------------------------------------
  //unlisten
  //------------------------------------------------------------------------------
  unlisten: function unlisten(target, type, listener){
    var eventNamespace = '',
        returnValue = [],
        arResults,
        listenerContainer,
        listeners,
        i, l, o;
        
    type = (type == null) ? '*' : type;
    //see if there was a namespace included in the event type
    if(type.indexOf('.') > -1){
      eventNamespace = type.split('.');
      type = eventNamespace.pop();
      eventNamespace = eventNamespace.join('.');
    }
    
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, [unlisten, _.isString(target)].concat(_slice.call(arguments, 0)));
    }
    
    //if we aren't able to get a reference to the ddplisteners object, quit
    if(!(listenerContainer = _.getData(target, '__listeners__'))){ return returnValue; }
    
    if(type == '*'){
      arResults = [];
      for(var key in listenerContainer){
        if(_hasOwnProperty.call(listenerContainer, key)){
          _push.apply(arResults, unlisten(target, eventNamespace ? eventNamespace + '.' + key : key, listener));
        }
      }
      return arResults;
    }
    
   
    //if there is an array of listeners for this event type
    if(_.isArray(listeners = listenerContainer[type])){
      //record the array length and set a decrementor
      i = l = listeners.length;
      while(i--){
        o = listeners[i];
        
        if((o.fn == listener || !listener) && _events.namespaceMatch(eventNamespace, o.namespace)){
          listeners.splice(i, 1);
          //if the last event listener was just removed
          if(--l==0){
            if(listeners.__eventModel__ == 1){
              target.removeEventListener(type, _executeListeners, false);
            }
            else if(listeners.__eventModel__ == 2){
              target.detachEvent('on' + type, listeners.scopeFixer);
            }
            else if(target['on' + type] == listeners.scopeFixer){
              target['on' + type] = undefined;
              //delete target['on' + type];
            }
            listeners.hooked = false;
          }
          //a function reference was supplied
          if(listener){ return o.fn; }
          //otherwise, add the fn to the array
          returnValue.push(o.fn);
        }
      }
    }
    
    return returnValue;
  },
  
  
  fire: function fire(target, type, obj){
    var objEvent,
        objBrowserEvent,
        eventNamespace = '',
        arResults, i, l,
        eventModel,
        listenerContainer,
        listeners;
        
    //alow for the single object parameter that contains all the relevent arguments
    if(arguments.length==1){
      obj = target;
      target = obj.target;
      type = obj.type;
    }
    
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, _.toArray([fire, _.isString(target)], arguments));
    }
  
    //see if there was a namespace included in the event type
    if(type.indexOf('.') > -1){
      eventNamespace = type.split('.');
      type = eventNamespace.pop();
      eventNamespace = eventNamespace.join('.');
    }
    
    //get the event model used to add the listeners for this event type (or null)
    eventModel = ((listenerContainer = _.getData(target, '__listeners__')) && (listeners = listenerContainer[type]) ? listeners.__eventModel__ : null);
    
    if(type == '*'){
      arResults = [];
      for(var key in listenerContainer){
        if(_hasOwnProperty.call(listenerContainer, key)){
          arResults = arResults.concat(_events.fire(target, eventNamespace ? eventNamespace + '.' + key : key, obj, manualBubble));
        }
      }
      return arResults;
    }
    
    //make sure "obj" exists
    obj = obj || {};
    
    //set some properties that will be passed to the event object
    objEvent = _.clone(obj, false, _events.Event);
    objEvent.eventNamespace = eventNamespace;
    objEvent.manualBubble = !!(obj.manualBubble || (obj.bubbles && !_.isElement(target, true, true)));
    objEvent.bubbles = !!(objEvent.bubbles || objEvent.manualBubble);
    objEvent.type = type;
    
    if((eventModel == 1 || !eventModel) && target.dispatchEvent){
      //obj.eventModel = 
      objEvent.eventModel = 1;
      //create a browser event object on the fly using our event type and extended event properties
      objBrowserEvent = _events._createBrowserEventObject(type, obj);
      objBrowserEvent.cruxEvent = objEvent;
      //and fire the event, returning "1" (to report the firing method used)  or false, if it was unsuccessful
      target.dispatchEvent(objBrowserEvent);  //fire the event
    }
    else if(eventModel == 2 && target.fireEvent){
      //obj.eventModel = 
      objEvent.eventModel = 2;
      //create a browser event object on the fly using our event type and extended event properties
      objBrowserEvent = _events._createBrowserEventObject(type, obj);
      objBrowserEvent.cruxEvent = objEvent;
      //and fire the event, returning "1" (to report the firing method used)  or false, if it was unsuccessful
      target.fireEvent('on' + type, objBrowserEvent) ? 2 : false; //fire the event
    }
    //if no other model was used, default to the aerm
    else{
      objEvent.eventModel = 3;
      //
      objEvent.normalize(obj);
      objEvent.type = type;
      objEvent.target = objEvent.currentTarget = target;
      //since this is not going to be a browser event
      _executeListeners.call(target, objEvent);
      //if this event bubbles, climb up the tree and fire the listeners on each parent object
      while(objEvent.manualBubble && !objEvent.stopped() && objEvent.currentTarget.parentNode){
        _executeListeners.call(objEvent.currentTarget.parentNode, objEvent);
      }
      //when we're done executing listeners, and the default action wasn't cancelled and the target isn't an element
      //execute the default actions 
      objEvent.returnValue !== false && !_.isElement(target, true, true) && _doDefaultActions(objEvent);
    }
      
    //return the event object
    return objEvent;
  },
  
  
  addDefaultAction: function addDefaultAction(target, type, fn){
    var listenerContainer = _.getData(target, '__listeners__') || _.setData(target, '__listeners__', {}),
        listeners = (listenerContainer && _.isArray(listenerContainer[type])) ? listenerContainer[type] : listenerContainer[type] = [],
        actions = listeners.defaulActions || (listeners.defaulActions = []);
    if(actions.indexOf(fn) < 0){
      actions.push(fn);
      _.isElement(target, true) && _events.listen(window, 'system.defaultAction.' + type, _events.emptyListener);
      return 1;
    }
    return 0;
  },

  
  //--------------------------------------------------------------------------------------------
  //listeners
  //--------------------------------------------------------------------------------------------
  listeners: function listeners(target, type, fn, callback){
    var listenerContainer = _.getData(target, '__listeners__'),
        arResults = [],
        eventNamespace = '',
        listeners, i, o;
    
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, [_events.listeners, _.isString(target)].concat(_slice.call(arguments, 0)));
    }
        
    if(type === null || type === undefined){
      type = '*';
    }
    else{
      //see if there was a namespace included in the event type
      if(type.indexOf('.') > -1){
        eventNamespace = type.split('.');
        type = eventNamespace.pop();
        eventNamespace = eventNamespace.join('.');
      }
    }
    
    if(type == '*'){
      for(var key in listenerContainer){
        if(_hasOwnProperty.call(listenerContainer, key)){
          //arResults = arResults.concat(_events.listeners(target, eventNamespace ? eventNamespace + '.' + key : key, fn));
          _push.apply(arResults, _events.listeners(target, eventNamespace ? eventNamespace + '.' + key : key, fn));
        }
      }
      return arResults;
    }
    
    if(listenerContainer && _.isArray(listeners = listenerContainer[type]) && (i = listeners.length)){
      while(i--){
        o = listeners[i];
        if((!fn || o.fn === fn) && _events.namespaceMatch(eventNamespace, o.namespace)){
          arResults.push(o.fn);
          callback && callback(i, listeners, eventNamespace, type);
        }
      }
    }
    return arResults;
  },
 
 
  latch: function latch(target, type){
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, [latch, _.isString(target)].concat(_slice.call(arguments, 0)));
    }
    var obj = _.getData(target, '__listeners__') || _.setData(target, '__listeners__', {});
    var listeners = !_.isArray(obj[type]) ? (obj[type] = []) : obj[type];
    //if the element has already been assigned as a "one time event" for this event type
    //don't overwrite the values already present
    if(listeners.__latchEvent__ !== undefined){ return 0; }
    //set a flag so that we can identify this element+event as a "one time" and mark it as "not yet fired"
    listeners.__latchEvent__ = false;
    //add an handler that marks the object+event as fired and preserves the event object
    _events.listenOnce(target, type, function(e){
      listeners.__latchEvent__ = e;
      //_events.unlisten(target, type);
    });
    //return the number of successful "latchings" (will be counted by a parent function if multiple are added)
    return 1;
  },
  
  unlatch: function unlatch(target, type){
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, [unlatch, _.isString(target)].concat(_slice.call(arguments, 0)));
    }
    var obj = _.getData(target, '__listeners__');
    if(obj && _.isArray(obj[type])){
      obj[type].__latchEvent__ = undefined;
      return 1;
    }
    //_.setData(target, '__latchEvent__' + type, undefined);
    return 0;
  },
  
  
  isLatch: function isLatch(target, type){
    var x = _events.latchClosed(target, type);
    //if the element has already been assigned as a "trap event" for this event type 
    return !!(x === false || x);
  },
  
  
  //can return undefined, false, or an event object
  latchClosed: function latchClosed(target, type){
    var obj = _.getData(target, '__listeners__');
    if(obj && _.isArray(obj[type])){
      return obj[type].__latchEvent__;
    }
  },
  
  
  /***************************************************************/
  //setOneTimeEvent
  //flags an event on an object as a "one time event"
  relatch: function relatch(target, type){
    if(_.isString(target) || (_.isString(type) && type.indexOf(' ') > -1) || _.isArray(type)){
      return _events._demux.apply(this, [relatch, _.isString(target)].concat(_slice.call(arguments, 0)));
    }
    var e = _events.latchClosed(target, type);
    //is one, but hasn't fired yet so it doesn't need to be reset 
    if(e === false){ return 0; }
    //if it's already been "closed", unlatch it
    e && _events.unlatch(target, type);
    //re-set up the trap event
    _events.latch(target, type);
    return 1;
  },
  
  
  namespaceMatch: function namespaceMatch(eventNS, listenerNS){
    //console.log(eventNS, listenerNS);
    if(!listenerNS || !eventNS || eventNS == '*' || listenerNS == '*' || eventNS == listenerNS){ return true; }
    eventNS = (eventNS + '').split('.');
    listenerNS = (listenerNS + '').split('.');
    var l = eventNS.length;
    while(l--){
      if(eventNS[l] !== listenerNS[l]){
        return false;
      }
    }
    return true;
  },
  
  /***************************************************************/
  //Modified from an original posted April 1st, 2009 by kangax
  //additional functionality from diego perini
  //http://perfectionkills.com/detecting-event-support-without-browser-sniffing/
  //this method has fairly decent accuracy in ie8 and under but has a lot of issues in other browsers. False positives and negatives.
  supported: function supported(eventName, el){
    var EVENT_TAGNAMES = {'select':'input', 'change':'input', 'submit':'form', 'reset':'form', 'error':'img', 'load':'img', 'abort':'img'};
    //plain objects should return false;
    if(typeof el == 'object' && !el.nodeType && el != window){
      return false;
    }
      
    //if an element wasn't passed in, create an appropriate one for the event type
    el = el || document.createElement(EVENT_TAGNAMES[eventName] || "div");
    
    //check if the event name exists as a property on the element or if the event type is enumerated in the window.Event object
    var isSupported = "on" + eventName in el ||
        "on" + eventName.toLowerCase() in el ||
        top.Event &&
        typeof top.Event == "object" &&
        eventName.toUpperCase() in top.Event;
  
    if(!isSupported){
      eventName = "on" + eventName;
      if(!el.setAttribute && (el == window || el == document)){
        el = document.createElement("div");
      }
      if(el.setAttribute && el.removeAttribute){
        el.setAttribute(eventName, "");
        isSupported = typeof el[eventName] == "function";
        if(typeof el[eventName] != "undefined"){
          try{
            //el[eventName] = void(0); //stops JSLint from parsing any further
            el[eventName] = undefined;
          }
          catch(e){}
        }
        el.removeAttribute(eventName);
      }
    }
    el = null;
    return !!isSupported; //!! ensures "undefined" is not passed back 
  },
  
  //this object contains the events emulated for browsers that don't support them
  emulated: {
    //emulate the IE mouseeenter event for FF/Opera
    "mouseenter":{
      "attachToEvent": "mouseover",
      "prerequisiteEvents": "mouseleave",
      "fn": function(e){
        //if "relatedTarget"(FF) or "fromElement"(Opera) is not a child of the original event target (this)
        if(!_dom.isChild(e.relatedTarget || e.fromElement, this) && !_.getData(this, '__mouseEntered__')){
          //sorry, adding an expando. memory leakage should be minimal with the boolean value
          _.setData(this, '__mouseEntered__', true);
          //clone the browser generated event object (this preserves mouse coordinates, originating time, etc..)
          //set the bubbles property to false (when passed to the fireEvent function, this will stop the fired event from bubbling)
          //(which we want because we're trying to mimic the IE 'mouseenter' behaviour)
          //fire the mouseleave event manually (using the cloned event object as a parameter)
          return _events.fire(this, 'mouseenter', _.extend({}, e, {bubbles: false, nativeEvent: e})).returnValue;
        }
      }
    },
    
    //emulate the IE mouseeleave event for FF/Opera
    "mouseleave":{
      "attachToEvent": "mouseout",
      "prerequisiteEvents": "mouseenter",
      "fn": function(e){
        //if "relatedTarget"(FF) or "toElement"(Opera) is not a child of the original event target (this) AND "relatedTarget" is not the original target
        if(!_dom.isChild(e.relatedTarget || e.toElement, this) && e.relatedTarget != this){
          //delete the expando.
          _.setData(this, '__mouseEntered__', undefined);
          //clone the browser generated event object (this preserves mouse coordinates, originating time, etc..)
          //set the bubbles property to false (when passed to the fireEvent function, this will stop the fired event from bubbling)
          //(which we want because we're trying to mimic the IE 'mouseleave' behaviour)
          //fire the mouseleave event manually (using the cloned event object as a parameter)
          return _events.fire(this, 'mouseleave', _.extend({}, e, {bubbles: false, nativeEvent: e})).returnValue;
        }
      }
    },
    
    //emulate the mozilla/w3c event DOMMouseScroll on ie and opera
    "DOMMouseScroll":{
      "attachToEvent": "mousewheel",
      "fn": function(e){
        //fire the event so that it looks like it came from the event type we're emulating
        //return the returnValue (in case IE wants to prevent the default action)
        return _events.fire(this, 'DOMMouseScroll', e).returnValue;
      }
    },
    
    //emulate a new type of event which is fired when the enter key is pressed on an element (e.g. <input>)
    "enterkeypress":{
      "attachToEvent": "keypress",
      "fn": function(e){
        //using the convertor for the "key" property (from the CruxEvent object), figure out the code of the key pressed
        if(_events.Event.prototype.converters.key(e) == 13){
          //clone the browser generated event object (preserves mouse coordinates, originating time, etc..)
          //fire the enterkey event manually (using the cloned event object as a parameter)
          return _events.fire(this, 'enterkeypress', _.extend({}, e, {bubbles: false, nativeEvent: e})).returnValue;
        }
      }
    },
    //emulate a new type of event which is fired when the enter key is pressed on an element (e.g. <input>)
    "focusin":{
      "attachToEvent": "DOMFocusIn",
      "fn": function(e){
        //clone the browser generated event object (preserves mouse coordinates, originating time, etc..)
        //fire the emulated event manually (using the cloned event object as a parameter)
        return _events.fire(this, 'focusin', _.extend({}, e, {bubbles: false, nativeEvent: e})).returnValue;
      }
    }
    /*
    "inview":{
      "attachToEvent": "scroll resize load",
      "attachToElement": window,
      "isLatch": true,
      "fn": function(objWindowEvent){
        var et = _events.Event.prototype.target(objWindowEvent);
        if(et != window && et != document && et != document.documentElement && et !== null)
          return;
        if(_events.trapFired(this, 'inview')){
          return;
        }
        var bg = _dom.geometry();
        var ep = _dom.position(this, null, true);
        
        if(bg.viewportHeight + bg.verticalScroll >= ep.y &&
           bg.verticalScroll <= ep.y &&
           bg.viewportWidth + bg.horizontalScroll >= ep.x &&
           bg.horizontalScroll <= ep.x){
          
          //clone the browser generated event object (preserves mouse coordinates, originating time, etc..)
          var objEventProperties = _.clone(objWindowEvent);
          objEventProperties.bubbles = false;
          
          //fire the inview event manually (using the cloned event object as a parameter)
          //Also, the 5th argument tells the function to return the event object created during the firing process 
          var objReturnEvent = _events.fire(this, 'inview', objEventProperties, false, true);
          
          if(objReturnEvent.returnValue === false){
            //TODO: fix line below
            //preventEventDefault(objKeypressEvent);
          }
          if(objReturnEvent.cancelBubble){
            //TODO: fix line below
            //stopEventPropagation(objKeypressEvent);
          }
          return objReturnEvent.returnValue;
        }
      }
    },
    "pagehide":{
      "attachToEvent": "unload",
      "fn": function(objUnloadEvent){
        //
        if(objUnloadEvent.persisted){
          //clone the browser generated event object (preserves mouse coordinates, originating time, etc..)
          var objEventProperties = cloneObject(objUnloadEvent, true);
          objEventProperties.bubbles = false;
          //fire the enterkey event manually (using the cloned event object as a parameter)
          //Also, the 5th argument tells the function to return the event object created during the firing process 
          var objReturnEvent = fireEvent(this, 'pagehide', objEventProperties, false, true);
          
          if(objReturnEvent.returnValue === false){
            preventEventDefault(objKeypressEvent);
          }
          if(objReturnEvent.cancelBubble){
            stopEventPropagation(objKeypressEvent);
          }
          return objReturnEvent.returnValue;
        }
      }
    }
    */
  },
  
  
  modules : ['HTMLEvents', 'UIEvents', 'MouseEvents', 'MutationEvents'],
  
  typeHash : {
    //HTMLEvents
    'abort': 0,
    'blur': 0,
    'change': 0,
    'error': 0,
    'focus': 0,
    'load': 0,
    'reset': 0,
    'resize': 0,
    'scroll': 0,
    'select': 0,
    'submit': 0,
    'unload': 0,
    'beforeunload': 0,
    
    //UIEvents
    'DOMActivate': 1,
    'DOMFocusIn': 1,
    'DOMFocusOut': 1,
    'keydown': 1,
    'keypress': 1,
    'keyup': 1,
    
    //MouseEvents
    'click': 2,
    'dblclick': 2,
    'mousedown': 2,
    'mousemove': 2,
    'mouseout': 2,
    'mouseover': 2,
    'mouseup': 2,
    'mouseenter': 2, //ie only
    'mouseleave': 2, //ie only
    
    //MutationEvents
    'DOMAttrModified': 3,
    'DOMNodeInserted': 3,
    'DOMNodeRemoved': 3,
    'DOMCharacterDataModified': 3,
    'DOMNodeInsertedIntoDocument': 3,
    'DOMNodeRemovedFromDocument': 3,
    'DOMSubtreeModified': 3
  },
  
  
  /***************************************************************/
  //internal function for creating an event object, cross-browser wise
  _createBrowserEventObject: function _createBrowserEventObject(type, objEventProperties){
    var objEvent, //our new event object
        ep = objEventProperties || {},
        //detect if the event properties object supports the hasOwnProperty method
        supportsHOP = !!ep.hasOwnProperty,
        //if the objEventProperties object was passed and contains a "cancelable" property which is false, then be false, otherwise true. 
        blnCancelable = ep.cancelable !== false,
        blnBubbles    = ep.bubbles    !== false;
    
    //w3c event model
    if(document.createEvent){
      //try to detect the events module that the browser wants us to use for this event type
      ep.eventModule = _hasOwnProperty.call(_events.typeHash, type) ? _events.modules[_events.typeHash[type]] : crux.detected.customEventsModule;
      objEvent = document.createEvent(ep.eventModule); //create an event object using the proper event module (for FF anyway..)
      
      //use the appropriate event initializer according to the event module and
      //whether or not the browser has implemented the initializer method
      //if it's a mouse event
      if(ep.eventModule == 'MouseEvents' && objEvent.initMouseEvent){
        //use the mouse event initializer
        objEvent.initMouseEvent(
          type, blnBubbles, blnCancelable, ep.view || window,
          ep.detail || null, ep.screenX || 0, ep.screenY || 0, ep.clientX || 0, ep.clientY || 0,
          ep.ctrlKey || 0, ep.altKey || 0, ep.shiftKey || 0, ep.metaKey || 0, ep.button || 0, ep.relatedTarget || null
        );
      }
      else if(ep.eventModule == 'UIEvents' && objEvent.initUIEvent){
        objEvent.initUIEvent(type, blnBubbles, blnCancelable, ep.view || window, ep.detail || null);
      }
      else if(ep.eventModule == 'KeyboardEvent' && objEvent.initKeyEvent){
       event.initKeyEvent(type, blnBubbles, blnCancelable, ep.view || window, ep.ctrlKey, 
                          ep.altKey, ep.shiftKey, ep.metaKey, ep.keyCode, ep.charCode);
      }
      //there may be issues with events from the MutationEvents Module. FF documentation is unclear on arguments
      //to the initMutationEvent method and in the w3c spec DOM Mutation events have been deprecated in their current
      //form due to performance issues. 
      else if(ep.eventModule == 'MutationEvents' && objEvent.initMutationEvent){
        objEvent.initMutationEvent(type, blnBubbles, blnCancelable, ep.relatedNode, 
                                   ep.prevValue, ep.newValue, ep.attrName, ep.attrChange);
      }
      else if(ep.eventModule == 'CustomEvent' && objEvent.initCustomEvent){
        objEvent.initCustomEvent(type, blnBubbles, blnCancelable, ep.detail);
      }
      else{
        objEvent.initEvent(type, blnBubbles, blnCancelable);
      }
    }
    //the IE Event Model
    else if(document.createEventObject){
      objEvent = document.createEventObject(); //create an event object
      objEvent.type = type;            //set the proper event type
      objEvent.cancelable = blnCancelable;     //set the cancelable property of the event object
      objEvent.bubbles = blnBubbles;           //set the bubbles property of the event object
    }
    
    if(objEventProperties){
      //iterate through the object's properties (no particular order)
      for(var key in ep){
        if( key != 'type' && key != 'cancelable'&& key != 'bubbles' && (!supportsHOP || ep.hasOwnProperty(key)) ){
          try{
            //i don't like doing this. it's unreliable to count on the event object allowing us to write to a property
            objEvent[key] = ep[key]; //set the event object's property from the passed object's
          }
          catch(e){
            //try{ console.log('native event object didn\'t like us writing to the "' + key + '" property'); } catch(e){}
          }
        }
      }
    }
    
    return objEvent;
  },
  
  
  //Browser Encapsulated Event Procedure
  //executes a function within the context of a browser event.
  //provides the ability to stop errors from stopping all handlers from failing 
  BEEP: (function(){
    var el = document.documentElement,
        type = 'cruxBEEPEvent',
        opc = "onpropertychange",
        //event object, function to encapsulate, this, arguments, return value
        w3cEvent, f, t, a,
        r = [];
    //some fuctionality for allowing custom events to be executed within an actual browser event listener
    //(allows for a less tragic result when errors are encountered within the event handlers)
    if(el){
      //w3c
      if(el.addEventListener){
        //add the w3c event listsner for a custom event (cruxBEEPEvent)
        el.addEventListener(type, function(objEvent){ r.push(f.apply(t, a)); }, false);
        
        return function BEEP(fn, args, ths){
          f = fn;
          t = ths || null;
          a = args;
          //r = undefined;
          //re-use the previous browser event object, if it exists
          //w3cEvent = (w3cEvent && !w3cEvent.inUse ? w3cEvent : _events._createBrowserEventObject(type, {"cancelable": false, "bubbles": false}));
          w3cEvent = _events._createBrowserEventObject(type, {"cancelable": false, "bubbles": false});
          //mark the event object as being in use (so we don't try and dispatch another event within this event handler using the same event object)
          w3cEvent.inUse = true;
          //firing the DDPAERMEvent on the document element (usually <HTML>), executes "currentHandler" within a browser event
          //which provides the ability to show errors but keep them from breaking the rest of the framework
          el.dispatchEvent(w3cEvent);
          //we're done with it, it can be re-used now
          w3cEvent.inUse = false;
          //r will have been populated by the return value of the passed function
          return r.pop();
        };
      }
      //ie<9
      else if(el.attachEvent && el.detachEvent){
        //add a listener (below) for the onpropertychange event
        el.attachEvent(opc, testEvent);
        //if the browser supports the event, the "fired" flag is set
        function testEvent(){ testEvent.fired = true; }
        //changing the "cruxBEEPEvent" property of the document element should trigger the onpropertychange event (if it's supported)
        el[type] = 1;
        //detach the test listener, so it isn't repeatedly executed
        el.detachEvent(opc, testEvent);
        //if the browser supports the onproprtychange event
        if(testEvent.fired){
          //add the listener that will always exist and execute the passed in function
          //(in the listener, check that it was the "cruxBEEPEvent" property that was changed and execute the listener, if there is one)
          el.attachEvent(opc, function(){ (event.propertyName === type) && f && (r.push(f.apply(t, a))); });
          //return a function that will set the propr local vars and trigger the browser event
          return function BEEP(fn, args, ths){
            f = fn;
            t = ths || null;
            a = args;
            //this fires the IE "onpropertychange" event on the documentElement (flips the value between 1 and -1)
            //which executes "fn" from within a browser event
            el[type] *= -1;
            //var rv;
            //try{console.log(rv = r.pop());}catch(x){}
            //return rv;
            return r.pop();
          };
        }
      }
    }
    //no support for encapsulating execution within a browser event
    //just flat out execute it
    return function BEEP(fn, args, ths){ return fn.apply(ths || null, args); };
  })(),
  
  
  //TODO: determin if regular objects with handlers will have their events cloned properly
  //if so, move this method into the crux.dom namespace
  cloneListeners: function cloneListeners(source, dest, deep){
    var v = _.clone(_.getData(source, '__listeners__'), 2),
        sc = source.children,
        dc = dest.children;
        
    if(deep && sc && dc){
      var i = sc.length;
      //make sure the elements have the same number of children
      if(i == dc.length){
        while(i-- && sc[i] && cd[i]){
          cloneListeners(sc[i], cd[i], true);
        }
      }
    }
    if(_.isElement(dest, true) || dest == window){
      for(var key in v){
        if(_hasOwnProperty.call(v, key)){
          v[key].__eventModel__ = null;
          //set up each event type
          _.listen(dest, key, function(){});
        }
      }
    }
    //this will overwrite the listeners added above but maintain the main trigger DOM listener
    return _.setData(dest, '__listeners__', v);
  },
  
  
  Event : (function (){
    function CruxEvent(obj){
      obj && this.normalize(obj);
    }
    CruxEvent.prototype = {
      normalize : function(obj){
        var c = this.converters;
        obj = obj ? (this.nativeEvent = obj) : this.nativeEvent;
        for(var k in c){ _hasOwnProperty.call(c, k) && (this[k] = (c[k] === true ? obj[k] : c[k](obj, this))); }
        this.normalized = true;
        return this;
      },
      toString: function(){
        return '[object CruxEvent]';
      },
      converters: {
        //true indicated direct copy
        currentTarget: true,
        altKey       : true,
        cancelBubble : true,
        button       : true,
        ctrlKey      : true,
        metaKey      : true,
        shiftKey     : true,
        type: function(e, t){ return t.type || e.type; },
        bubbles: function(e){ return !!(e.cancelable !== false); },
        cancelable: function(e){ return !(e.bubbles !== true); },
        target: function(e){
          var t = e.target || e.sourceElement || e.srcElement;
          t && t.nodeType == 3 && t.parentNode && (t = t.parentNode); //safari bug
          return t;
        },
        timeStamp: function(e){
          //Opera < 10 doesn't have a timestamp property on it's event object
          return e.timeStamp || (new Date).getTime();
        },
        detail: function(e){
          var detail = e.detail || 0;
          //['click', 'dblclick', 'mousedown', 'mouseup']
          //the detail property indicates how many times the mouse has been clicked in the same location
          if(['mousescroll', 'mousewheel'].indexOf(e.type) + 1){
            // IE/Opera
            if(!detail && e.wheelDelta){
              //wheelDelta gives us 120 or -120. this calc gives us 3 or -3 to bring the value in sync with the mozilla/w3c value.
              detail = e.wheelDelta/120*3;
              //if it's IE (i realize saying "not opera" isn't the same as "is IE", but for all intents and purposes this will have to do.)
              if(!window.opera){
                detail *= -1;
              }
            }
          }
          return detail;
        },
        key: function(e){
          return e.charCode || e.which || e.keyCode || false; // gh - 31-dec-2010
        },
        x: function(e){ return (e.pageX != null || e.pageY != null) ? e.pageX : (e.clientX + document.body.scrollLeft - document.body.clientLeft); },
        y: function(e){ return (e.pageX != null || e.pageY != null) ? e.pageY : (e.clientY + document.body.scrollTop  - document.body.clientTop); },
        related: function(e){
          //TODO: fix this... don't think the whole to/from logic works.
          return e.relatedTarget || e.fromElement || e.toElement;
        }
      },
      prevent : function(){
        var obj = this.nativeEvent;
        obj.preventDefault && obj.preventDefault();
        return obj.returnValue = false;
      },
      prevented: function(){
        return this.nativeEvent.returnValue === false;
      },
      stop: function(){
        var obj = this.nativeEvent;
        if(obj.cancelable){
          obj.stopPropagation && obj.stopPropagation();
          return obj.cancelBubble = true;
        }
      },
      stopped: function stopped(){
        return !!this.nativeEvent.cancelBubble;
      },
      immediateStop: function immediateStop(){
        if(this.stop()){
          var obj = this.nativeEvent;
          obj.stopImmediatePropagation && obj.stopImmediatePropagation();
          return obj.immediateCancelBubble = true;
        }
      },
      immediateStopped: function immediateStopped(){
        return !!this.nativeEvent.immediateCancelBubble;
      },
      cancel: function(){ this.prevent(); this.immediateStop(); }
    };
    return CruxEvent;
  })()
});



//attach the most used methods from events module to the root module 
_.listen    = _events.listen;
_.unlisten  = _events.unlisten;
_.fire      = _events.fire;


//end events module
}