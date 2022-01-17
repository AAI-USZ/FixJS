function(o){
    var left, op, right, reft, lvar, sign, name, res, code, del, that, __ref, __i, __len;
    left = this.left.expandSlice(o, true).unwrap();
    if (!this.right) {
      left.isAssignable() || left.carp('invalid unary assign');
      __ref = Chain(left).cacheReference(o), left = __ref[0], this.right = __ref[1];
      for (__i = 0, __len = (__ref = this.unaries).length; __i < __len; ++__i) {
        op = __ref[__i];
        this.right = Unary(op, this.right);
      }
    }
    if (left.isEmpty()) {
      return (__ref = Parens(this.right), __ref.front = this.front, __ref.newed = this.newed, __ref).compile(o);
    }
    if (left.getDefault()) {
      this.right = Binary(left.op, this.right, left.second);
      left = left.first;
    }
    if (left.items) {
      return this.compileDestructuring(o, left);
    }
    if (this.logic) {
      return this.compileConditional(o, left);
    }
    left.isAssignable() || left.carp('invalid assign');
    op = this.op, right = this.right;
    if (op === '<?=' || op === '>?=') {
      return this.compileMinMax(o, left, right);
    }
    if (op === '**=' || op === '+=' && (right instanceof Arr || right instanceof While) || op === '*=' && right.isString() || (op === '-=' || op === '/=') && right.isMatcher()) {
      __ref = Chain(left).cacheReference(o), left = __ref[0], reft = __ref[1];
      right = Binary(op.slice(0, -1), reft, right);
      op = ':=';
    }
    (right = right.unparen()).ripName(left = left.unwrap());
    lvar = left instanceof Var;
    sign = op.replace(':', '');
    name = (left.front = true, left).compile(o, LEVEL_LIST);
    code = !o.level && right instanceof While && !right['else'] && (lvar || left.isSimpleAccess())
      ? (res = o.scope.temporary('res')) + " = [];\n" + this.tab + right.makeReturn(res).compile(o) + "\n" + this.tab + name + " " + sign + " " + o.scope.free(res)
      : (name + " " + sign + " ") + (right.assigned = true, right).compile(o, LEVEL_LIST);
    if (lvar) {
      del = right.op === 'delete';
      if (op === '=') {
        o.scope.declare(name, left, this['const']);
      } else if (that = o.scope.checkReadOnly(name)) {
        left.carp("assignment to " + that + " variable \"" + name + "\"");
      }
    }
    if (that = o.level) {
      if (del) {
        code += ", " + name;
      }
      if (that > (del ? LEVEL_PAREN : LEVEL_LIST)) {
        code = "(" + code + ")";
      }
    }
    return code;
  }