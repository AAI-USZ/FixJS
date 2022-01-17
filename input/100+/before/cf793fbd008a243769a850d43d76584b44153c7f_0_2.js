function(o, level){
    var level, tab, node, code, codes, __res, __i, __ref, __len;
    level == null && (level = o.level);
    if (level) {
      return this.compileExpressions(o, level);
    }
    o.block = this;
    tab = o.indent;
    __res = [];
    for (__i = 0, __len = (__ref = this.lines).length; __i < __len; ++__i) {
      node = __ref[__i];
      node = node.unfoldSoak(o) || node;
      if (!(code = (node.front = true, node).compile(o, level))) {
        continue;
      }
      node.isStatement() || (code += node.terminator);
      __res.push(tab + code);
    }
    codes = __res;
    return codes.join('\n');
  }