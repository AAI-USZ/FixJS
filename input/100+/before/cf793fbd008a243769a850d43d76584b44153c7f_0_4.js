function Index(key, symbol, init){
    var key, symbol, k, __this = this instanceof __ctor ? this : new __ctor;
    symbol || (symbol = '.');
    if (init && key instanceof Arr) {
      switch (key.items.length) {
      case 0:
        key = Key('__proto__');
        break;
      case 1:
        if (!((k = key.items[0]) instanceof Splat)) {
          key = Parens(k);
        }
      }
    }
    switch (symbol.slice(-1)) {
    case '=':
      __this.assign = symbol.slice(1);
      break;
    case '@':
      __this.vivify = symbol.length > 2 ? Arr : Obj;
    }
    __this.key = key;
    __this.symbol = symbol;
    return __this;
  } function __ctor(){}