function Wash(options) {
      this.process = __bind(this.process, this);
      var key, value, _ref2, _ref3;
      for (key in options) {
        if (!__hasProp.call(options, key)) continue;
        value = options[key];
        this[key] = value;
      }
      if ((_ref2 = this.interface) == null) this.interface = 'mon0';
      if ((_ref3 = this.scan) == null) this.scan = true;
      this.proc = null;
    }