function() {
      var args, callable, fcall, item;
      callable = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (callable instanceof C.Symbol) {
        item = C.get_var_val(callable);
        if (item instanceof C.Macro) {
          if (item.invoke != null) {
            return new C.Raw(item.invoke.apply(item, args));
          } else {
            return item.transform.apply(item, args);
          }
        }
      }
      return fcall = new C.FunctionCall({
        fn: callable,
        args: args
      }, callable.yy);
    }