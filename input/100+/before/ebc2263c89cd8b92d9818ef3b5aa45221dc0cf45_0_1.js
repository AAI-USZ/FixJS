function (o) {
    var ty;
    var op = this.operator;

    if (op === "sizeof") {
      ty = this.argument.reflect(o);
      return cast(new Literal(ty.size, this.argument.loc), i32ty);
    }

    var arg = this.argument = this.argument.transform(o);
    ty = arg.ty;

    if (op === "delete" && ty) {
      check(ty instanceof PointerType, "cannot free non-pointer type");
      return (new CallExpression(o.scope.FREE(), [this.argument], this.loc)).transform(o);
    }

    if (op === "*") {
      check(ty instanceof PointerType, "cannot dereference non-pointer type " + quote(tystr(ty, 0)));
      return cast(this, ty.base);
    }

    if (op === "&") {
      check(ty, "cannot take address of untyped expression");
      if (arg.variable) {
        arg.variable.isStackAllocated = true;
      }
      return cast(this, new PointerType(ty));
    }

    if (op === "!" || op === "~") {
      return cast(this, i32ty);
    }

    if (op === "-") {
      if (arg.ty && arg.ty.numeric) {
        return cast(this, arg.ty);
      }
      return cast(this, f64ty);
    }

    return this;
  }