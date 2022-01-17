function(o){
    var that, op, it, code, _;
    if (that = this.compileSpread(o)) {
      return that;
    }
    op = this.op, it = this.it;
    switch (op) {
    case '!':
      it.cond = true;
      break;
    case 'new':
      it.isCallable() || it.carp('invalid constructor');
      break;
    case 'do':
      _ = Parens(it instanceof Existence && !it.negated
        ? Chain(it).add(Call())
        : Call.make(it));
      return (_.front = this.front, _.newed = this.newed, _).compile(o);
    case 'delete':
      if (it instanceof Var || !it.isAssignable()) {
        this.carp('invalid delete');
      }
      if (o.level && !this['void']) {
        return this.compilePluck(o);
      }
      break;
    case '++':
    case '--':
      it.isAssignable() || this.carp('invalid ' + crement(op));
      if (that = it instanceof Var && o.scope.checkReadOnly(it.value)) {
        this.carp(crement(op) + " of " + that + " variable \"" + it.value + "\"");
      }
      if (this.post) {
        it.front = this.front;
      }
      break;
    case '^':
      return util('clone') + "(" + it.compile(o, LEVEL_LIST) + ")";
    case 'classof':
      return util('toString') + ".call(" + it.compile(o, LEVEL_LIST) + ").slice(8, -1)";
    }
    code = it.compile(o, LEVEL_OP + PREC.unary);
    if (this.post) {
      code += op;
    } else {
      if ((op === 'new' || op === 'typeof' || op === 'delete') || (op === '+' || op === '-') && op === code.charAt()) {
        op += ' ';
      }
      code = op + code;
    }
    if (o.level < LEVEL_CALL) {
      return code;
    } else {
      return "(" + code + ")";
    }
  }