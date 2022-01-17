function() {
    var is_callback = function(val) {
      return val.__original_callback__ === callback || (val.listener && val.listener.__original_callback__ === callback);
    };
    
    if (!_this._events || !_this._events[event]) { return null; }
    if (Array.isArray(_this._events[event])) {
      var l;
      for (l in (_this._events[event] || [])) {
        if (is_callback(l)) {
          return l;
        }
      }
    } else if (is_callback(_this._events[event])) {
      return _this._events[event];
    }
    return null;
  }