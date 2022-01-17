function Function(_arg) {
      var _ref1, _ref2, _ref3;
      this.name = _arg.name, this.args = _arg.args, this.body = _arg.body, this.autoreturn = _arg.autoreturn;
      if ((_ref1 = this.name) == null) {
        this.name = '';
      }
      if ((_ref2 = this.args) == null) {
        this.args = [];
      }
      if ((_ref3 = this.body) == null) {
        this.body = [];
      }
      Function.__super__.constructor.apply(this, arguments);
      if (this.args instanceof C.Array) {
        this.args = this.args.items;
      }
    }