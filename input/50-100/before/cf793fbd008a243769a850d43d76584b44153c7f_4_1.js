function(it){
  var it, __ref;
  it || (it = this.tokens);
  addImplicitIndentation(it);
  tagPostfixConditionals(it);
  addImplicitParentheses(it);
  addImplicitBraces(it);
  expandLiterals(it);
  if (((__ref = it[0]) != null ? __ref[0] : void 8) === 'NEWLINE') {
    it.shift();
  }
  return it;
}