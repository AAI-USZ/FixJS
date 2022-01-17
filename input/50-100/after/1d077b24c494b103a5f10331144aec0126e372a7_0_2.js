function(e) {
      var _ref, _ref1;
      if ((_ref = e.keyCode) === 37 || _ref === 38 || _ref === 39 || _ref === 40 || _ref === 65 || _ref === 68 || _ref === 83 || _ref === 87) {
        return this._changeHandle((_ref1 = e.keyCode) === 37 || _ref1 === 40 || _ref1 === 65 || _ref1 === 83 ? 'l' : 'r');
      }
    }