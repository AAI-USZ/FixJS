function(o){
    var temps, idx, pvar, step, tvar, tail, vars, eq, cond, svar, srcPart, lvar, head, body, __ref;
    o.loop = true;
    temps = this.temps = [];
    if (idx = this.index) {
      o.scope.declare(idx, this);
    } else {
      temps.push(idx = o.scope.temporary('i'));
    }
    if (!this.object) {
      __ref = (this.step || Literal(1)).compileLoopReference(o, 'step'), pvar = __ref[0], step = __ref[1];
      pvar === step || temps.push(pvar);
    }
    if (this.from) {
      __ref = this.to.compileLoopReference(o, 'to'), tvar = __ref[0], tail = __ref[1];
      vars = idx + " = " + this.from.compile(o, LEVEL_LIST);
      if (tail !== tvar) {
        vars += ", " + tail;
        temps.push(tvar);
      }
      eq = this.op === 'til' ? '' : '=';
      cond = +pvar
        ? idx + " " + (pvar < 0 ? '>' : '<') + eq + " " + tvar
        : pvar + " < 0 ? " + idx + " >" + eq + " " + tvar + " : " + idx + " <" + eq + " " + tvar;
    } else {
      if (this.item || this.object && this.own) {
        __ref = this.source.compileLoopReference(o, 'ref', !this.object), svar = __ref[0], srcPart = __ref[1];
        svar === srcPart || temps.push(svar);
      } else {
        svar = srcPart = this.source.compile(o, LEVEL_PAREN);
      }
      if (!this.object) {
        if (0 > pvar && ~~pvar === +pvar) {
          vars = idx + " = " + srcPart + ".length - 1";
          cond = idx + " >= 0";
        } else {
          temps.push(lvar = o.scope.temporary('len'));
          vars = idx + " = 0, " + lvar + " = " + srcPart + ".length";
          cond = idx + " < " + lvar;
        }
      }
    }
    head = 'for (' + (this.object
      ? idx + " in " + srcPart
      : (step === pvar || (vars += ', ' + step), (vars + "; " + cond + "; ") + (1 == Math.abs(pvar)
        ? (pvar < 0 ? '--' : '++') + idx
        : idx + (pvar < 0
          ? ' -= ' + pvar.slice(1)
          : ' += ' + pvar))));
    this.own && (head += ") if (" + o.scope.assign('__own', '{}.hasOwnProperty') + ".call(" + svar + ", " + idx + ")");
    head += ') {';
    this.infuseIIFE();
    o.indent += TAB;
    if (this.item && !this.item.isEmpty()) {
      head += '\n' + o.indent + Assign(this.item, JS(svar + "[" + idx + "]")).compile(o, LEVEL_TOP) + ';';
    }
    body = this.compileBody(o);
    if (this.item && '}' === body.charAt(0)) {
      head += '\n' + this.tab;
    }
    return head + body;
  }