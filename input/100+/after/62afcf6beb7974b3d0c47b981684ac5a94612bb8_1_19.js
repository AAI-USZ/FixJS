function() {
      var args, body, name, rest, scope, set_, to_define, value;
      to_define = arguments[0], rest = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (!rest.length) {
        to_define.error("Def", "You must provide a value.");
      }
      scope = C.current_scope();
      if (to_define instanceof C.List) {
        name = to_define.value[0];
        args = to_define.value.slice(1);
        body = rest;
        value = new C.Lambda({
          name: name,
          args: args,
          body: body
        });
      } else if (to_define instanceof C.Symbol) {
        name = to_define;
        value = rest[0];
      } else {
        to_define.error("Def", "Invalid definition.");
      }
      name = new C.Var(name);
      return set_ = new C.Var.Set({
        _var: name,
        value: value
      });
    }