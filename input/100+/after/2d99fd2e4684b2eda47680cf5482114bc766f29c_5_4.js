function __partialize(f, args, where){
    return function(){
      var params = __slice.call(arguments), i,
          len = params.length, wlen = where.length,
          ta = args ? args.concat() : [], tw = where ? where.concat() : [];
      for(i = 0; i < len; ++i) { ta[tw[0]] = params[i]; tw.shift(); }
      return len < wlen && len ? __partialize(f, ta, tw) : f.apply(this, ta);
    };
  }