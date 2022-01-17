function(event, callback) {
  var _this = this;
  var find_listener = function(callback) {
    var is_callback = function(val) {
      return val.__original_callback__ === callback || (val.listener && val.listener.__original_callback__ === callback);
    };
    
    if (!_this._events || !_this._events[event]) { return null; }
    if (Array.isArray(_this._events[event])) {
      var x, listeners = _this._events[event] || [];
      for (x = 0; x < listeners.length; ++x) {
        if (is_callback(listeners[x])) {
          return listeners[x];
        }
      }
    } else if (is_callback(_this._events[event])) {
      return _this._events[event];
    }
    return null;
  };
    
  var listener = find_listener(callback);
  if (!listener || typeof(listener) !== 'function') { return this; }
  return _removeListener.call(this, event, listener);
}