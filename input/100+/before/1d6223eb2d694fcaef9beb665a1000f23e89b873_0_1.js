function _executeListeners(ev){
  
  var r, o, listeners,
      objEvent = (ev = ev || window.event),
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
      else if(_events.namespaceMatch(objEvent.eventNamespace, o.namespace)){
        //encapsulate the execution of the listener inside a browser event
        if(o.once){ _events.unlisten(this, (o.namespace ? o.namespace + '.': '') + objEvent.type, o.fn); }
        //update the "listenerNamespace" property on the event object with the current listener namespace
        objEvent.listenerNamespace = o.namespace;
        //console.log(objEvent, objEvent.__eventModel__, objEvent.eventModel);
        /*
        if(1==2 && objEvent.eventModel == 3){
          r = _events.BEEP(o.fn, [objEvent], this);
        }
        else{
          r = o.fn.call(this, objEvent);
        }
        */
        r = _events.BEEP(o.fn, [o.noWrap ? objEvent.nativeEvent : objEvent], this);
        //r = o.fn.call(this, o.noWrap ? objEvent.nativeEvent : objEvent);
        
        if(r === false || (objEvent.type === 'beforeunload' && _.isString(r))){
          objEvent.returnValue = r;
        }
        else{
          r = objEvent.returnValue;
        }
      }
    }
  }
  this === window && !objEvent.prevented() && _doDefaultActions(objEvent);
  //return the event return value
  return objEvent.returnValue;
}