function(eventStr, params){
        var eventObj = this._events.parseEventStr(eventStr);
        // DOM event 'event selector', e.g. 'click button'
        if (eventObj.selector) {
          // Manually override root selector, as jQuery selectors can't select self object
          if (eventObj.selector === ROOT_SELECTOR) {
            this.view.$().trigger(eventObj.type, params);
          }
          else {          
            this.view.$().find(eventObj.selector).trigger(eventObj.type, params);
          }
        }
        // Custom event
        else {
          $(this._events.data).trigger('_'+eventObj.type, params);
          // fire 'pre' hooks in reverse attachment order ( last first )
          util.reverseEvents(this._events.data, 'pre:' + eventObj.type);
          $(this._events.data).trigger('pre:' + eventObj.type, params);
          // put the order of events back
          util.reverseEvents(this._events.data, 'pre:' + eventObj.type);
          $(this._events.data).trigger(eventObj.type, params);
          if(this.parent())
            this.parent().trigger((eventObj.type.match(/^child:/) ? '' : 'child:') + eventObj.type, params)
          $(this._events.data).trigger('post:' + eventObj.type, params);
        }
        return this; // for chainable calls
      }