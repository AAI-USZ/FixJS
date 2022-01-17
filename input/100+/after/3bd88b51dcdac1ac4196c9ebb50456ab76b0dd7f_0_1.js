function(code, index){
  var match, input, id, last, tag, that, __ref;
  input = (match = (ID.lastIndex = index, ID).exec(code))[0];
  if (!input) {
    return 0;
  }
  id = match[1];
  if (NONASCII.test(id)) {
    try {
      Function("var " + id);
    } catch (e) {
      this.carp("invalid identifier \"" + id + "\"");
    }
  }
  last = this.last;
  if (match[2] || last[0] === 'DOT' || this.adi()) {
    this.token('ID', __of(id, KEYWORDS) ? (__ref = Object(id), __ref.reserved = true, __ref) : id);
    if (match[2]) {
      this.token(':', ':');
    }
    return input.length;
  }
  switch (id) {
  case 'true':
  case 'false':
  case 'null':
  case 'void':
  case 'arguments':
  case 'debugger':
    tag = 'LITERAL';
    break;
  case 'new':
  case 'do':
  case 'typeof':
  case 'delete':
    tag = 'UNARY';
    break;
  case 'return':
  case 'throw':
    tag = 'HURL';
    break;
  case 'break':
  case 'continue':
    tag = 'JUMP';
    break;
  case 'var':
  case 'const':
  case 'export':
    tag = 'DECL';
    break;
  case 'this':
  case 'eval':
  case 'super':
    return this.token('LITERAL', id, true).length;
  case 'for':
    this.seenFor = true;
    // fallthrough
  case 'then':
    this.wantBy = false;
    break;
  case 'catch':
  case 'function':
    id = '';
    break;
  case 'in':
  case 'of':
    if (this.seenFor) {
      this.seenFor = false;
      if (id === 'of') {
        id = '';
        this.wantBy = true;
        if (last[0] === 'ID' && (__ref = this.tokens)[__ref.length - 2][0] !== 'FOR') {
          id = this.tokens.pop()[1];
          if ((__ref = this.tokens)[__ref.length - 1][0] === ',') {
            this.tokens.pop();
          }
        }
      }
      break;
    }
    // fallthrough
  case 'instanceof':
    if (last[1] === '!') {
      id = this.tokens.pop()[1] + id;
    }
    tag = 'RELATION';
    break;
  case 'not':
    if (last.alias && last[1] === '===') {
      return last[1] = '!==', 3;
    }
    tag = 'UNARY';
    id = '!';
    break;
  case 'and':
  case 'or':
  case 'is':
    this.unline();
    if (id === 'is') {
      this.token('COMPARE', '===');
    } else {
      this.token('LOGIC', id === 'or' ? '||' : '&&');
    }
    this.last.alias = true;
    return id.length;
  case 'unless':
    tag = 'IF';
    break;
  case 'until':
    tag = 'WHILE';
    break;
  case 'import':
    if (able(this.tokens)) {
      id = '<<<';
    } else {
      tag = 'DECL';
    }
    break;
  default:
    if (__of(id, KEYWORDS_SHARED)) {
      break;
    }
    if (__of(id, KEYWORDS_UNUSED)) {
      this.carp("reserved word \"" + id + "\"");
    }
    if (!last[1] && ((__ref = last[0]) === 'CATCH' || __ref === 'FUNCTION' || __ref === 'LABEL')) {
      last[1] = id;
      last.spaced = false;
      return id.length;
    }
    tag = 'ID';
    switch (id) {
    case 'own':
      if (last[0] === 'FOR') {
        tag = 'OWN';
      }
      break;
    case 'all':
      if (that = last[1] === '<<<' && '<' || last[1] === 'import' && 'All') {
        last[1] += that;
        return 3;
      }
      break;
    case 'from':
      this.forange() && (tag = 'FROM');
      break;
    case 'to':
    case 'til':
      this.forange() && this.tokens.push(['FROM', '', this.line], ['STRNUM', '0', this.line]);
      if (this.seenFrom) {
        this.seenFrom = false;
        this.wantBy = true;
        tag = 'TO';
      } else if (last[0] === 'STRNUM' && !last.callable) {
        last[0] = 'RANGE';
        last.op = id;
        return id.length;
      }
      break;
    case 'by':
      if (last[0] === 'STRNUM' && (__ref = this.tokens)[__ref.length - 2][0] === 'RANGE') {
        tag = 'RANGE_BY';
      } else {
        this.wantBy && (this.wantBy = !(tag = 'BY'));
      }
      break;
    case 'ever':
      if (last[0] === 'FOR') {
        this.seenFor = false;
        last[0] = 'WHILE';
        tag = 'LITERAL';
        id = 'true';
      }
    }
  }
  tag || (tag = match[1].toUpperCase());
  if (tag === 'RELATION' || tag === 'THEN' || tag === 'ELSE' || tag === 'CASE' || tag === 'DEFAULT' || tag === 'CATCH' || tag === 'FINALLY' || tag === 'IN' || tag === 'OF' || tag === 'FROM' || tag === 'TO' || tag === 'BY' || tag === 'EXTENDS' || tag === 'IMPLEMENTS') {
    this.unline();
  }
  this.token(tag, id);
  return input.length;
}