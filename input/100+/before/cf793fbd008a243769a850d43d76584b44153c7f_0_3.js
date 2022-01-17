function(o, level){
    var level, val, __ref;
    level == null && (level = o.level);
    switch (val = this.value + "") {
    case 'this':
      return ((__ref = o.scope.fun) != null ? __ref.bound : void 8) || val;
    case 'undefined':
      val = 'void';
      // fallthrough
    case 'void':
      val += ' 8';
      // fallthrough
    case 'null':
      if (level === LEVEL_CALL) {
        this.carp('invalid use of ' + this.value);
      }
      break;
    case 'on':
    case 'yes':
      val = 'true';
      break;
    case 'off':
    case 'no':
      val = 'false';
      break;
    case '*':
      this.carp('stray star');
      break;
    case 'debugger':
      if (level) {
        return "(function(){\n" + TAB + o.indent + "debugger;\n" + o.indent + "}())";
      }
    }
    return val;
  }