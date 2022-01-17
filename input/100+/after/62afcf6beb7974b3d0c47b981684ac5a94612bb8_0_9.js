function Macro(_arg, yy) {
      var name, scope, transform;
      name = _arg.name, this.argnames = _arg.argnames, this.template = _arg.template, transform = _arg.transform, this.invoke = _arg.invoke;
      this.name = new C.Var(name);
      scope = C.current_scope();
      scope.set_var(this.name, this);
      if (transform != null) {
        this.transform = transform;
      }
      Macro.__super__.constructor.call(this, null, yy);
    }