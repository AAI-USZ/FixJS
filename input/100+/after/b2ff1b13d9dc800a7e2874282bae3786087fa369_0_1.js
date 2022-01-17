function Binary(op, first, second){
    var __this = this instanceof __ctor ? this : new __ctor;
    __this.partial = first == null || second == null;
    if (!__this.partial) {
      switch (op) {
      case 'in':
        return new In(first, second);
      case 'with':
        return new Import(Unary('^^', first), second, false);
      case '<<<':
      case '<<<<':
        return Import(first, second, op === '<<<<');
      case '+':
        if (first instanceof Arr) {
          first.items.push(Splat(second));
          return first;
        }
        if (second instanceof Arr || second instanceof While && (second = Arr([Splat(second)]))) {
          second.items.unshift(Splat(first));
          return second;
        }
      }
    }
    __this.op = op;
    __this.first = first;
    __this.second = second;
    return __this;
  } function __ctor(){}