function Unary(op, it, flag){
    var it, that, node, __i, __ref, __len, __this = this instanceof __ctor ? this : new __ctor;
    if (it != null) {
      if (that = !flag && it.unaries) {
        that.push(op);
        return it;
      }
      switch (op) {
      case '!':
        if (flag) {
          break;
        }
        if (it instanceof Fun && !it['void']) {
          return it['void'] = true, it;
        }
        return it.invert();
      case '++':
      case '--':
        if (flag) {
          __this.post = true;
        }
        break;
      case 'new':
        if (it instanceof Existence && !it.negated) {
          it = Chain(it).add(Call());
        }
        it.newed = true;
        for (__i = 0, __len = (__ref = it.tails || '').length; __i < __len; ++__i) {
          node = __ref[__i];
          if (node instanceof Call && !node['new']) {
            if (node.method === '.call') {
              node.args.shift();
            }
            node['new'] = 'new';
            node.method = '';
            return it;
          }
        }
        break;
      case '~':
        if (it instanceof Fun && it.statement && !it.bound) {
          return it.bound = '__this', it;
        }
      }
    }
    __this.op = op;
    __this.it = it;
    return __this;
  } function __ctor(){}