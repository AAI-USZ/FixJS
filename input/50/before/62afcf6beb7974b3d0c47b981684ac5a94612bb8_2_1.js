function (sname, args, yy) {
    var s = sym(sname, yy);
    return new C.Call([sym].concat(args), yy);
  }