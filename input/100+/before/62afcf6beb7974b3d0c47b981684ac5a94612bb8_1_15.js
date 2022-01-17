function(_super) {

    __extends(Macro, _super);

    function Macro(_arg, yy) {
      var name, scope, transform;
      name = _arg.name, this.argnames = _arg.argnames, this.template = _arg.template, transform = _arg.transform, this.invoke = _arg.invoke, this.oppo_fn = _arg.oppo_fn;
      this.name = new C.Var(name);
      scope = C.current_scope();
      scope.set_var(this.name, this);
      if (transform != null) {
        this.transform = transform;
      }
      Macro.__super__.constructor.call(this, null, yy);
    }

    Macro.prototype.compile = function() {
      return "null";
    };

    Macro.prototype.invoke = function() {};

    Macro.prototype.transform = function() {};

    Macro.can_transform = function(item) {
      return (item != null) && (item.transform != null) && !item.builtin;
    };

    Macro.transform = function(code) {
      var callable, item, transformed;
      if (code instanceof C.ReturnedConstruct) {
        code = code.value;
      }
      if (code instanceof C.List) {
        callable = code.items[0];
        if (callable instanceof C.Symbol) {
          item = C.get_var_val(callable);
          if (this.can_transform(item)) {
            transformed = item.transform.apply(item, code.items.slice(1));
          }
        }
      }
      if (!transformed && this.can_transform(code)) {
        transformed = code.transform();
      }
      if ((transformed != null) && transformed !== code) {
        return this.transform(transformed);
      } else {
        return code;
      }
    };

    return Macro;

  }