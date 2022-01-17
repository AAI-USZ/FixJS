function(code, index){
  var input, tabs, length, last, that, delta, tag, __ref;
  __ref = (MULTIDENT.lastIndex = index, MULTIDENT).exec(code), input = __ref[0], tabs = __ref[1];
  length = this.countLines(input).length;
  last = this.last;
  last.eol = true;
  last.spaced = true;
  if (index + length >= code.length) {
    return length;
  }
  if (that = tabs && (this.emender || (this.emender = RegExp('[^' + tabs.charAt() + ']'))).exec(tabs)) {
    this.carp("contaminated indent " + escape(that));
  }
  if (0 > (delta = tabs.length - this.dent)) {
    this.dedent(-delta);
    this.newline();
  } else {
    if ((tag = last[0]) === 'ASSIGN' && ((__ref = '' + last[1]) !== '=' && __ref !== ':=' && __ref !== '+=') || (tag === '+-' || tag === '=>' || tag === 'DOT' || tag === 'LOGIC' || tag === 'MATH' || tag === 'COMPARE' || tag === 'RELATION' || tag === 'SHIFT' || tag === 'BITWISE' || tag === 'IN' || tag === 'OF' || tag === 'TO' || tag === 'BY' || tag === 'FROM' || tag === 'EXTENDS' || tag === 'IMPLEMENTS')) {
      return length;
    }
    if (delta) {
      this.indent(delta);
    } else {
      this.newline();
    }
  }
  this.wantBy = false;
  return length;
}