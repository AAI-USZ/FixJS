function() {
    return function(value) {
      return function(type) {
        var _ref;
        if (((_ref = value()) != null ? _ref.type : void 0) === type().dataType) {
          return _true();
        } else {
          return _false();
        }
      };
    };
  }