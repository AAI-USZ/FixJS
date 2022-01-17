function(o, potest){
    var lines, ret, code, res, run, that, __key;
    o['break'] = true;
    o['continue'] = true;
    lines = this.body.lines;
    code = ret = '';
    if (this.returns) {
      if (lines[__key = lines.length - 1] != null) {
        lines[__key] = lines[__key].makeReturn(res = o.scope.assign('__results', '[]'));
      }
      ret = "\n" + this.tab + "return " + (res || '[]') + ";";
    }
    if (this['else']) {
      lines.unshift(JS((run = o.scope.temporary('run')) + " = true;"));
    }
    if (that = this.body.compile(o, LEVEL_TOP)) {
      code += "\n" + that + "\n" + this.tab;
    }
    code += '}';
    if (potest) {
      code += " while (" + potest.compile((o.tab = this.tab, o), LEVEL_PAREN) + ");";
    }
    if (run) {
      if (this.returns) {
        this['else'].makeReturn();
      }
      code += " if (!" + run + ") " + this.compileBlock(o, this['else']);
    }    return code + ret;
  };
