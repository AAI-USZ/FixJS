function Binding(el, type, model, keypath, formatters) {
      this.el = el;
      this.type = type;
      this.model = model;
      this.keypath = keypath;
      this.formatters = formatters != null ? formatters : [];
      this.unbind = __bind(this.unbind, this);

      this.publish = __bind(this.publish, this);

      this.bind = __bind(this.bind, this);

      this.set = __bind(this.set, this);

      this.routine = Rivets.routines[this.type] || attributeBinding(this.type);
    }