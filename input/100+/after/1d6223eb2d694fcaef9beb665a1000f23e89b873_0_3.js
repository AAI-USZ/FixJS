function unlisten(target, type, listener){
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
  }