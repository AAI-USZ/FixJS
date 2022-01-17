function Set(_arg, yy) {
      var scope, value, _ref1;
      this._var = _arg._var, value = _arg.value, this.must_exist = _arg.must_exist;
      Set.__super__.constructor.apply(this, arguments);
      this.value = value;
      scope = C.find_scope_with_var(this._var);
      if ((_ref1 = this.must_exist) == null) {
        this.must_exist = true;
      }
      if (this.must_exist && !scope) {
        this._var.error_cant_set();
      }
    }