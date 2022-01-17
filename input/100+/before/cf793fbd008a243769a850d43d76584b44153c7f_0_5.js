function Call(args){
    var args, splat, __this = this instanceof __ctor ? this : new __ctor;
    args || (args = []);
    if (args.length === 1 && (splat = args[0]) instanceof Splat) {
      if (splat.filler) {
        __this.method = '.call';
        args[0] = Literal('this');
        args[1] = Splat(Literal('arguments'));
      } else if (splat.it instanceof Arr) {
        args = splat.it.items;
      }
    }
    __this.args = args;
    return __this;
  } function __ctor(){}