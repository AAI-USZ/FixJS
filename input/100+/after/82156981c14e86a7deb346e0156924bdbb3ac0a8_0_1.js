function Binding(el, type, bindType, model, keypath, formatters) {
      this.el = el;
      this.type = type;
      this.bindType = bindType;
      this.model = model;
      this.keypath = keypath;
      this.formatters = formatters != null ? formatters : [];
      this.unbind = __bind(this.unbind, this);

      this.publish = __bind(this.publish, this);

      this.bind = __bind(this.bind, this);

      this.set = __bind(this.set, this);

      if (this.bindType === "event") {
        this.routine = eventBinding(this.type);
      } else {
        this.routine = Rivets.routines[this.type] || attributeBinding(this.type);
      }
    }