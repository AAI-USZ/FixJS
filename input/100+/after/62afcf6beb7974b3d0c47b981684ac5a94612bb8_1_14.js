function(code) {
      var callable, item, transformed;
      if (code instanceof C.ReturnedConstruct) {
        code = code.value;
      }
      if (code instanceof C.List && !(code.quoted || code.quasiquoted)) {
        callable = code.items[0];
        if (callable instanceof C.Symbol) {
          item = C.get_var_val(callable);
          if (this.can_transform(item)) {
            transformed = item.transform.apply(item, code.items.slice(1));
          }
        }
      }
      if (!transformed && (!(code instanceof C.Macro)) && (this.can_transform(code))) {
        transformed = code.transform();
      }
      if ((transformed != null) && transformed !== code) {
        return this.transform(transformed);
      } else {
        return code;
      }
    }