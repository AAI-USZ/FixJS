function(evt) {
        // Want to ensure we don't alter the evt object passed in as it 
        // may be a bubbling event. So clone it and then setting currentTarget
        // won't break some event that is already being dispatched.
        evt = create(evt);
        ('target' in evt) || (evt.target = this); // don't change target on bubbling event
        evt.currentTarget = this;
        evt._propagationStopped = ('bubbles' in evt) ? !evt.bubbles : false;
        evt.stopPropagation = function() {
            evt._propagationStopped = true;
        };
        if (hasOwnProperty(this, '_evento_listeners') &&
            hasOwnProperty(this._evento_listeners, evt.type)) {
            // Copy the list of listeners in case one of the
            // listeners modifies the list while we are
            // iterating over the list.
            //
            // Without making a copy, one listener removing
            // an already-called listener would result in skipping
            // a not-yet-called listener. One listener removing 
            // a not-yet-called listener would result in skipping that
            // not-yet-called listner. The worst case scenario 
            // is a listener adding itself again which would
            // create an infinite loop.
            //
            var listeners = this._evento_listeners[evt.type].slice(0);
            for (var i = 0, ilen = listeners.length; i < ilen; i++) {
                var listener = listeners[i];
                if (typeof listener === 'function') {
                    listener.call(this, evt);
                }
                else {
                    listener.handleEvent(evt);
                }
            }
        }
        if (hasOwnProperty(this, '_evento_parents') &&
            !evt._propagationStopped) {
            var parents = this._evento_parents.slice(0);
            for (var i = 0, ilen = parents.length; i < ilen; i++) {
                parents[i].dispatchEvent(evt);
            }
        }
    }