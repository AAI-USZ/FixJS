function(o){
    var lines, yet, tab, ret, code, res, that, __key, __ref;
    o['break'] = o['continue'] = true;
    lines = this.body.lines, yet = this.yet, tab = this.tab;
    code = ret = '';
    if (this.returns) {
      if (lines[__key = lines.length - 1] != null) {
        lines[__key] = lines[__key].makeReturn(res = o.scope.assign('__results', '[]'));
      }
      ret = "\n" + tab + "return " + (res || '[]') + ";";
      if ((__ref = this['else']) != null) {
        __ref.makeReturn();
      }
    }
    yet && lines.unshift(JS(yet + " = false;"));
    if (that = this.body.compile(o, LEVEL_TOP)) {
      code += "\n" + that + "\n" + tab;
    }
    code += '}';
    if (this.post) {
      code += " while (" + this.test.compile((o.tab = tab, o), LEVEL_PAREN) + ");";
    }
    if (yet) {
      code += " if (" + yet + ") " + this.compileBlock(o, this['else']);
      o.scope.free(yet);
    }    return code + ret;
  };
