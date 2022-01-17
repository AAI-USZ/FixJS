function(o, left, right){
    var lefts, rites, test, put, __ref;
    lefts = Chain(left).cacheReference(o);
    rites = right.cache(o, true);
    test = Binary(this.op.replace('?', ''), lefts[0], rites[0]);
    put = Assign(lefts[1], rites[1], ':=');
    if (this['void'] || !o.level) {
      return Parens(Binary('||', test, put)).compile(o);
    }
    __ref = test.second.cache(o, true), test.second = __ref[0], left = __ref[1];
    return If(test, left).addElse(put).compileExpression(o);
  }