function() {
      var rval;
      try {
        rval = arguments[numLogArgs+1].apply(
          arguments[numLogArgs], Array.prototype.slice.call(arguments,
                                                            numLogArgs+2));
      }
      catch(ex) {
        // (call errors are events)
        this._eventMap[name] = (this._eventMap[name] || 0) + 1;
        rval = ex;
      }
      return rval;
    }