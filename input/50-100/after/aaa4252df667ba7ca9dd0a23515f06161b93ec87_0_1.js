function (o) {
    o = extend(o);
    o.scope = this.frame;

    assert(this.body instanceof BlockStatement);
    this.body.body = compileList(this.body.body, o);

    return cast(this, this.decltype.reflect(o));
  }