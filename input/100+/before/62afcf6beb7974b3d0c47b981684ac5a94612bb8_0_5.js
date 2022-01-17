function() {
      var to_return, _ref3;
      to_return = (_ref3 = this.body) != null ? _ref3.pop() : void 0;
      if (to_return) {
        to_return = C.Macro.transform(to_return);
        this.body.push(to_return);
      }
      return Lambda.__super__.compile.apply(this, arguments);
    }