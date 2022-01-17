function View(el, contexts) {
      this.el = el;
      this.contexts = contexts;
      this.bind = __bind(this.bind, this);

      this.build = __bind(this.build, this);

      this.bindingRegExp = __bind(this.bindingRegExp, this);

      this.build();
    }