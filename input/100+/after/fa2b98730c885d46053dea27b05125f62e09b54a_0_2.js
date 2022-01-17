function Call(args){
    var splat, i, a, __len, __ref, __this = this instanceof __ctor ? this : new __ctor;
    args || (args = []);
    if (args.length === 1 && (splat = args[0]) instanceof Splat) {
      if (splat.filler) {
        __this.method = '.call';
        args[0] = Literal('this');
        args[1] = Splat(Literal('arguments'));
      } else if (splat.it instanceof Arr) {
        args = splat.it.items;
      }
    } else {
      for (i = 0, __len = args.length; i < __len; ++i) {
        a = args[i];
        if (a.value === '_') {
          args[i] = Chain(Literal('void'));
          args[i].placeholder = true;
          ((__ref = __this.partialized) != null
            ? __ref
            : __this.partialized = []).push(Chain(Literal(i)));
        }
      }
    }
    __this.args = args;
    return __this;
  } function __ctor(){}