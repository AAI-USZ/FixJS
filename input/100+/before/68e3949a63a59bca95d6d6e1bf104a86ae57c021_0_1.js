function Binary(op, first, second){
    var __ref, __this = this instanceof __ctor ? this : new __ctor;
    __this.partial = first == null || second == null;
    if (!__this.partial) {
      if ('=' === op.charAt(op.length - 1) && ((__ref = op.charAt(op.length - 2)) != '=' && __ref != '<' && __ref != '>' && __ref != '!')) {
        return Assign(first.unwrap(), second, op);
      }
      switch (op) {
      case 'in':
        return new In(first, second);
      case 'with':
        return new Import(Unary('^^', first), second, false);
      case '<<<':
      case '<<<<':
        return Import(first, second, op === '<<<<');
      case '<|':
        return Block(first).pipe(second, op);
      case '|>':
        return Block(second).pipe(first, '<|');
      }
    }
    __this.op = op;
    __this.first = first;
    __this.second = second;
    return __this;
  } function __ctor(){}