function (o) {
    var ty;
    var lty = this.consequent.ty;
    var rty = this.alternate.ty;

    print(lty);
    print(rty);

    if (typeof lty === "undefined" || typeof rty === "undefined") {
      return this;
    }

    if (lty.assignableFrom(rty)) {
      ty = lty;
    } else if (rty.assignableFrom(lty)) {
      ty = rty;
    }

    return cast(this, ty);
  }