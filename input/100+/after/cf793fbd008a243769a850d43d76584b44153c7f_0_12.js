function(o, level){
    var it;
    level == null && (level = o.level);
    it = this.it;
    it.cond || (it.cond = this.cond), it['void'] || (it['void'] = this['void']);
    if (this.calling && (!level || this['void'])) {
      it.head['void'] = true;
    }
    if (!(this.keep || this.newed || level >= LEVEL_OP + PREC[it.op])) {
      return (it.front = this.front, it).compile(o, level || LEVEL_PAREN);
    }
    if (it.isStatement()) {
      return it.compileClosure(o);
    } else {
      return "(" + it.compile(o, LEVEL_PAREN) + ")";
    }
  }