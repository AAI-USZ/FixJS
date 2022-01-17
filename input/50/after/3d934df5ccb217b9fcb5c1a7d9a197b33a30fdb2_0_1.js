function (o) {
    var ty = this.construct().resolve(o.types);
    if (ty !== undefined) {
      ty.lint();
    }
    return ty;
  }