function (o) {
    var ty = this.construct().resolve(o.types);
    ty.lint();
    return ty;
  }