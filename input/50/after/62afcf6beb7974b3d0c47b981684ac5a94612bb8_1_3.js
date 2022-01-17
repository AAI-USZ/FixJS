function (sname, args, yy) {
    var s = sym(sname, yy);
    return new C.List([s].concat(args), yy);
  }