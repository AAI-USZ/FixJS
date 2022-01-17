function() {

    function Binding(el, type, bindType, model, keypath, formatters) {
      this.el = el;
      this.type = type;
      this.bindType = bindType;
      this.model = model;
      this.keypath = keypath;
      this.formatters = formatters != null ? formatters : [];
      this.publish = __bind(this.publish, this);

      this.bind = __bind(this.bind, this);

      this.set = __bind(this.set, this);

      if (this.bindType === "event") {
        this.routine = eventBinding(this.type);
      } else {
        this.routine = Rivets.routines[this.type] || attributeBinding(this.type);
      }
    }

    Binding.prototype.set = function(value) {
      var formatter, _i, _len, _ref;
      _ref = this.formatters;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        formatter = _ref[_i];
        value = Rivets.config.formatters[formatter](value);
      }
      if (this.bindType === "event") {
        this.routine(this.el, value, this.currentListener);
        return this.currentListener = value;
      } else {
        return this.routine(this.el, value);
      }
    };

    Binding.prototype.bind = function() {
      Rivets.config.adapter.subscribe(this.model, this.keypath, this.set);
      if (Rivets.config.preloadData) {
        this.set(Rivets.config.adapter.read(this.model, this.keypath));
      }
      if (this.bindType === "bidirectional") {
        return bindEvent(this.el, 'change', this.publish);
      }
    };

    Binding.prototype.publish = function(e) {
      var el;
      el = e.target || e.srcElement;
      return Rivets.config.adapter.publish(this.model, this.keypath, getInputValue(el));
    };

    return Binding;

  }