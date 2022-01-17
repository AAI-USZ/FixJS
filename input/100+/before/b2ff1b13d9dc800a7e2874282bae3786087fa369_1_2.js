function(code, index){
  var sym, val, tag, arrow, i, t, that, up, __ref, __ref1;
  if (!(sym = (SYMBOL.lastIndex = index, SYMBOL).exec(code)[0])) {
    return 0;
  }
  switch (tag = val = sym) {
  case '=>':
    tag = 'THEN';
    this.unline();
    break;
  case '|':
    tag = 'CASE';
    if (this.doCase()) {
      return sym.length;
    }
    break;
  case '|>':
  case '|>>':
    tag = 'PIPE';
    break;
  case '`':
    tag = 'BACKTICK';
    break;
  case '<<':
  case '>>':
    tag = 'COMPOSE';
    break;
  case '<|':
    tag = 'BACKPIPE';
    break;
  case '+':
  case '-':
    tag = '+-';
    break;
  case '&':
    tag = 'CONCAT';
    break;
  case '&&':
  case '||':
    tag = 'LOGIC';
    break;
  case '&&&':
  case '|||':
  case '^^^':
    tag = 'BITWISE';
    break;
  case '^^':
    tag = 'CLONE';
    break;
  case '**':
  case '^':
    tag = 'POWER';
    break;
  case '?':
  case '!?':
    if (this.last.spaced) {
      tag = 'LOGIC';
    }
    break;
  case '/':
  case '%':
  case '%%':
    tag = 'MATH';
    break;
  case '+++':
    tag = 'CONCAT';
    break;
  case '++':
  case '--':
    tag = 'CREMENT';
    break;
  case '<<<':
  case '<<<<':
    tag = 'IMPORT';
    break;
  case ';':
    tag = 'NEWLINE';
    this.wantBy = false;
    break;
  case '.':
    if (this.last[0] === '(') {
      this.token('PARAM(', '(');
      this.token(')PARAM', ')');
      this.token('->', '->');
      this.token('ID', 'it');
    }
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
    if (!(able(this.tokens) || ((__ref = this.last[0]) == '(' || __ref == 'CREMENT'))) {
      this.tokens.push(['UNARY', '!', this.line], ['ASSIGN', '=', this.line]);
      return 2;
    }
    // fallthrough
  case '===':
  case '!==':
  case '==':
    val = (function(){
      switch (val) {
      case '===':
        return '==';
      case '!==':
        return '!=';
      case '==':
        return '===';
      case '!=':
        return '!==';
      }
    }());
    tag = 'COMPARE';
    break;
  case '<':
  case '>':
  case '<=':
  case '>=':
    tag = 'COMPARE';
    break;
  case '<<<<<':
  case '>>>>':
  case '>>>>>':
  case '<?':
  case '>?':
    tag = 'SHIFT';
    break;
  case '(':
    if (!(((__ref = this.last[0]) == 'FUNCTION' || __ref == 'LET') || this.able(true) || this.last[1] === '.@')) {
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
    if (tag === ')' && ((__ref = this.last[0]) == '+-' || __ref == 'COMPARE' || __ref == 'LOGIC' || __ref == 'MATH' || __ref == 'POWER' || __ref == 'SHIFT' || __ref == 'BITWISE' || __ref == 'CONCAT' || __ref == 'COMPOSE' || __ref == 'RELATION' || __ref == 'PIPE' || __ref == 'BACKPIPE' || __ref == 'IMPORT')) {
      (__ref = this.tokens)[__ref.length - 1][0] = this.last[0] === 'RELATION' ? 'BIOPR' : 'BIOP';
    }
    if (')' === (tag = val = this.pair(val))) {
      this.lpar = this.parens.pop();
    }
    break;
  case '=':
  case ':':
    if (this.last[0] === 'UNARY' && this.last[1] === '!' && ((__ref = (__ref1 = this.tokens)[__ref1.length - 2][1]) == '.@' || __ref == 'this')) {
      this.tokens.pop();
      this.token('CALL(', '(');
      this.token(')CALL', ')');
    }
    if (this.last[0] === ')CALL') {
      if (val === '=') {
        tag = 'ASSIGN';
      }
      arrow = '->';
      this.tokens.pop();
      this.token(')PARAM', ')');
      for (i = (__ref = this.tokens).length - 1; i >= 0; --i) {
        t = __ref[i];
        if (t[0] === 'CALL(') {
          break;
        }
      }
      this.tokens.splice(i, 1, [tag, val, this.line], ['PARAM(', '(', this.line]);
      if ((__ref = this.tokens[i - 1][1]) == '.@' || __ref == 'this') {
        this.tokens.splice(i - 1, 1);
        arrow = '~>';
        i--;
      }
      if (this.tokens[i - 2][1] === '!') {
        this.tokens.splice(i - 2, 1);
        this.tokens.splice(i, 0, ['UNARY', '!', this.line]);
      } else if (this.tokens[i - 2][1] === '.' && this.tokens[i - 3][1] === ')' && this.tokens[i - 4][1] === '!' && this.tokens[i - 5][1] === 'this') {
        this.tokens.splice(i - 4, 2);
        this.tokens.splice(i - 1, 0, ['UNARY', '!', this.line]);
      }
      this.token('->', arrow.charAt(0) + arrow);
      return sym.length;
    }
    if (val === ':') {
      if ((__ref = this.last[0]) != 'ID' && __ref != 'STRNUM' && __ref != ')') {
        tag = 'LABEL';
        val = '';
      }
      this.token(tag, val);
      return sym.length;
    }
    // fallthrough
  case ':=':
  case '+=':
  case '-=':
  case '*=':
  case '/=':
  case '%=':
  case '%%=':
  case '<?=':
  case '>?=':
  case '**=':
  case '^=':
    if (this.last[1] === '.' || this.last[0] === '?' && this.adi()) {
      this.last[1] += val;
      return val.length;
    }
    if (this.last[0] === 'LOGIC') {
      (val = Object(val)).logic = this.tokens.pop()[1];
    } else if ((val == '+=' || val == '-=') && !able(this.tokens) && ((__ref = this.last[0]) != '+-' && __ref != 'UNARY' && __ref != 'LABEL')) {
      this.token('UNARY', val.charAt());
      val = '=';
    }
    tag = 'ASSIGN';
    break;
  case '::=':
    this.token('DOT', '.');
    this.token('ID', 'prototype');
    this.token('IMPORT', '<<');
    return sym.length;
  case '*':
    if (that = ((__ref = this.last[0]) == 'NEWLINE' || __ref == 'INDENT' || __ref == 'THEN' || __ref == '=>') && (INLINEDENT.lastIndex = index + 1, INLINEDENT).exec(code)[0].length) {
      this.tokens.push(['LITERAL', 'void', this.line], ['ASSIGN', '=', this.line]);
      this.indent(index + that - 1 - this.dent - code.lastIndexOf('\n', index - 1));
      return that;
    }
    tag = able(this.tokens) || this.last[0] === 'CREMENT' && able(this.tokens, this.tokens.length - 1) || this.last[0] === '(' ? 'MATH' : 'STRNUM';
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
  case '-->':
  case '~~>':
    up = '->';
    // fallthrough
  case '<-':
  case '<~':
  case '<--':
  case '<~~':
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
  default:
    switch (val.charAt(0)) {
    case '(':
      this.token('CALL(', '(');
      tag = ')CALL';
      val = ')';
      break;
    case '<':
      if (val.length < 4) {
        this.carp('unterminated words');
      }
      this.adi();
      tag = 'WORDS';
      val = val.slice(2, -2);
    }
  }
  if ((tag == '+-' || tag == 'COMPARE' || tag == 'LOGIC' || tag == 'MATH' || tag == 'POWER' || tag == 'SHIFT' || tag == 'BITWISE' || tag == 'CONCAT' || tag == 'COMPOSE' || tag == 'RELATION' || tag == 'PIPE' || tag == 'BACKPIPE' || tag == 'IMPORT') && this.last[0] === '(') {
    tag = 'BIOP';
  }
  if (tag == ',' || tag == 'CASE' || tag == 'PIPE' || tag == 'BACKPIPE' || tag == 'DOT' || tag == 'LOGIC' || tag == 'COMPARE' || tag == 'MATH' || tag == 'POWER' || tag == 'IMPORT' || tag == 'SHIFT' || tag == 'BITWISE') {
    this.unline();
  }
  this.token(tag, val);
  return sym.length;
}