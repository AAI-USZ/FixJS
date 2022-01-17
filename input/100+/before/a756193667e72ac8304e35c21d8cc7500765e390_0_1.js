function(code, index){
  var sym, val, tag, that, up, __ref;
  if (!(sym = (SYMBOL.lastIndex = index, SYMBOL).exec(code)[0])) {
    return 0;
  }
  switch (tag = val = sym) {
  case '+':
  case '-':
    tag = '+-';
    break;
  case '&&':
  case '||':
    tag = 'LOGIC';
    break;
  case '?':
  case '!?':
    if (this.last.spaced) {
      tag = 'LOGIC';
    }
    break;
  case '/':
  case '%':
  case '**':
    tag = 'MATH';
    break;
  case '++':
  case '--':
    tag = 'CREMENT';
    break;
  case '<<<':
  case '<<<<':
    tag = 'IMPORT';
    break;
  case '&':
  case '|':
    tag = 'BITWISE';
    break;
  case ';':
    tag = 'NEWLINE';
    this.wantBy = false;
    break;
  case '.':
    if (this.last[1] === '?') {
      this.last[0] = '?';
    }
    tag = 'DOT';
    break;
  case ',':
    switch (this.last[0]) {
    case ',':
    case '[':
    case '(':
    case 'CALL(':
      this.token('LITERAL', 'void');
      break;
    case 'FOR':
    case 'OWN':
      this.token('ID', '');
    }
    break;
  case '!=':
    if (!(able(this.tokens) || this.last[0] === 'CREMENT')) {
      this.tokens.push(['UNARY', '!', this.line], ['ASSIGN', '=', this.line]);
      return 2;
    }
    // fallthrough
  case '===':
  case '!==':
  case '<':
  case '>':
  case '<=':
  case '>=':
  case '==':
    tag = 'COMPARE';
    break;
  case '<<':
  case '>>':
  case '>>>':
  case '<?':
  case '>?':
    tag = 'SHIFT';
    break;
  case '(':
    if (!(((__ref = this.last[0]) === 'FUNCTION' || __ref === 'LET') || this.able(true))) {
      this.token('(', '(');
      this.closes.push(')');
      this.parens.push(this.last);
      return 1;
    }
    tag = 'CALL(';
    this.closes.push(')CALL');
    break;
  case '[':
  case '{':
    this.adi();
    this.closes.push(']}'.charAt(val === '{'));
    break;
  case '}':
    if (this.inter && val !== (__ref = this.closes)[__ref.length - 1]) {
      this.rest = code.slice(index + 1);
      return 9e9;
    }
    // fallthrough
  case ']':
  case ')':
    if (')' === (tag = val = this.pair(val))) {
      if (this.last === (this.lpar = this.parens.pop())) {
        this.last[0] = 'CALL(';
        tag = ')CALL';
      }
    }
    break;
  case ':':
    switch (this.last[0]) {
    case 'ID':
    case 'STRNUM':
    case ')':
      break;
    case '...':
      this.last[0] = 'STRNUM';
      break;
    default:
      tag = 'LABEL';
      val = '';
    }
    break;
  case '=':
  case ':=':
  case '+=':
  case '-=':
  case '*=':
  case '/=':
  case '%=':
  case '&=':
  case '^=':
  case '|=':
  case '<<=':
  case '>>=':
  case '>>>=':
  case '<?=':
  case '>?=':
  case '**=':
    if (this.last[1] === '.' || this.last[0] === '?' && this.adi()) {
      this.last[1] += val;
      return val.length;
    }
    if (this.last[0] === 'LOGIC') {
      (val = Object(val)).logic = this.tokens.pop()[1];
    } else if ((val === '+=' || val === '-=' || val === '^=') && !able(this.tokens) && ((__ref = this.last[0]) !== '+-' && __ref !== '^' && __ref !== 'UNARY' && __ref !== 'LABEL')) {
      this.token('UNARY', val.charAt());
      val = '=';
    }
    tag = 'ASSIGN';
    break;
  case '*':
    if (that = ((__ref = this.last[0]) === 'NEWLINE' || __ref === 'INDENT' || __ref === 'THEN') && this.doInlinedent(code, index + 1, 'list')) {
      return that;
    }
    tag = able(this.tokens) || this.last[0] === 'CREMENT' && able(this.tokens, this.tokens.length - 1) ? 'MATH' : 'STRNUM';
    break;
  case '@':
  case '@@':
    this.dotcat(val) || (val === '@'
      ? this.token('LITERAL', 'this', true)
      : this.token('LITERAL', 'arguments'));
    return val.length;
  case '!':
    switch (false) {
    default:
      if (!this.last.spaced) {
        if (able(this.tokens, null, true)) {
          this.token('CALL(', '!');
          this.token(')CALL', ')');
        } else if (this.last[1] === 'typeof') {
          this.last[1] = 'classof';
        } else {
          break;
        }
        return 1;
      }
    }
    tag = 'UNARY';
    break;
  case '~':
    if (this.dotcat(val)) {
      return 1;
    }
    tag = 'UNARY';
    break;
  case '->':
  case '~>':
    up = '->';
    // fallthrough
  case '<-':
  case '<~':
    this.parameters(tag = up || '<-');
    break;
  case '::':
    up = 'prototype';
    // fallthrough
  case '..':
    this.adi();
    tag = 'ID';
    val = up || 'constructor';
    break;
  case '=>':
    return 1 + this.doInlinedent(code, index + 2);
  default:
    if ('<' === val.charAt(0)) {
      if (val.length < 4) {
        this.carp('unterminated words');
      }
      this.token('WORDS', val, this.adi());
      return val.length;
    }
  }
  if (tag === ',' || tag === '|>' || tag === 'DOT' || tag === 'LOGIC' || tag === 'COMPARE' || tag === 'MATH' || tag === 'IMPORT' || tag === 'SHIFT' || tag === 'BITWISE') {
    this.unline();
  }
  this.token(tag, val);
  return sym.length;
}