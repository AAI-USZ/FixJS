function mdepends(env, meta, sexp) {
    var sym = gensym(), attr;
    attr = into({}, keep(map(function(x) {
      return x[0] === "ref"
        ? [ "data-dep::"+x[1], sym ]
        : (x[0].substr(0,1) === ":"
            ? [ "data-"+sym+"::"+x[0].substr(1), x[1] ]
            : null);
    }, outof(meta))));
    return assoc(dup(sexp), "attr", dup(sexp.attr, attr));
  }