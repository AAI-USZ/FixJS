function Wash(options) {
      this.process = __bind(this.process, this);

      var key, value, _ref1, _ref2;
      for (key in options) {
        if (!__hasProp.call(options, key)) continue;
        value = options[key];
        this[key] = value;
      }
      if ((_ref1 = this["interface"]) == null) {
        this["interface"] = 'mon0';
      }
      if ((_ref2 = this.scan) == null) {
        this.scan = true;
      }
      this.proc = null;
    }