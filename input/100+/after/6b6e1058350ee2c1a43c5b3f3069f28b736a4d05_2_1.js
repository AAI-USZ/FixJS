function (type, listener, useCapture, priority, useWeakReference) {
    if (typeof listener !== 'function')
      throw ArgumentError();

    var list = useCapture ? this._captureHandlers : this._handlers;
    var handler = list[type];
    if (!handler) {
      var target = this;
      handler = {
        listeners: [],

        handleEvent: function (evt) {
          if (!(evt instanceof Event)) {
            var domEvent = evt;
            evt = domEvent._originalEvent;
            evt._eventPhase = domEvent.eventPhase;
          }

          evt._currentTarget = this;

          var listeners = this.listeners;
          for (var i = 0, n = listeners.length; i < n; i++) {
            var listener = listeners[i];
            listener(evt);
          }
        }
      };

      if (this._control)
        this._control.addEventListener(type, handler, useCapture);

      list[type] = handler;
    }
    handler.listeners.push(listener);
  }