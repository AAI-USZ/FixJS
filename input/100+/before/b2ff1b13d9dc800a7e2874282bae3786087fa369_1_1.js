function(code, index){
  var match, input, id, last, tag, __ref;
  input = (match = (ID.lastIndex = index, ID).exec(code))[0];
  if (!input) {
    return 0;
  }
  id = match[1].replace(/-+([a-zA-Z0-9$_])/g, function(it){
    return it[1].toUpperCase();
  });
  if (/-/.test(match[1])) {
    this.checkConsistency(id, match[1]);
  }
  if (NONASCII.test(id)) {
    try {
      Function("var " + id);
    } catch (e) {
      this.carp("invalid identifier \"" + id + "\"");
    }
  }
  last = this.last;
  if (match[4] || last[0] === 'DOT' || this.adi()) {
    this.token('ID', __in(id, KEYWORDS) ? (__ref = Object(id), __ref.reserved = true, __ref) : id);
    if (match[4]) {
      this.token(':', ':');
    }
    return input.length;
  }
  switch (id) {
  case 'true':
  case 'false':
  case 'on':
  case 'off':
  case 'yes':
  case 'no':
  case 'null':
  case 'void':
  case 'undefined':
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
      if (id === 'in') {
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
    tag = (__ref = this.tokens)[__ref.length - 1][0] === '(' ? 'BIOPR' : 'RELATION';
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
  case 'isnt':
    this.unline();
    tag = id == 'is' || id == 'isnt' ? 'COMPARE' : 'LOGIC';
    if (last[0] === '(') {
      tag = 'BIOP';
    }
    this.token(tag, (function(){
      switch (id) {
      case 'is':
        return '===';
      case 'isnt':
        return '!==';
      case 'or':
        return '||';
      case 'and':
        return '&&';
      }
    }()));
    this.last.alias = true;
    return id.length;
  case 'unless':
    tag = 'IF';
    break;
  case 'until':
    tag = 'WHILE';
    break;
  case 'import':
    id = '<<<';
    if (last[0] === '(') {
      tag = 'BIOP';
    } else {
      able(this.tokens) || this.token('LITERAL', 'this');
    }
    break;
  case 'with':
    tag = able(this.tokens) ? 'CLONEPORT' : 'WITH';
    break;
  case 'when':
    tag = 'CASE';
    // fallthrough
  case 'case':
    if (this.doCase()) {
      return input.length;
    }
    break;
  case 'loop':
    this.token('WHILE', id);
    this.token('LITERAL', 'true');
    return input.length;
  default:
    if (__in(id, KEYWORDS_SHARED)) {
      break;
    }
    if (__in(id, KEYWORDS_UNUSED)) {
      this.carp("reserved word \"" + id + "\"");
    }
    if (!last[1] && ((__ref = last[0]) == 'CATCH' || __ref == 'FUNCTION' || __ref == 'LABEL')) {
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
    case 'otherwise':
      if ((__ref = last[0]) == 'CASE' || __ref == '|') {
        last[0] = 'DEFAULT';
        return 9;
      }
      break;
    case 'all':
      if (last[1] === '<<<') {
        last[1] += '<';
        return 4;
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
      } else if (!last.callable && last[0] === 'STRNUM' && (__ref = this.tokens)[__ref.length - 2][0] === '[') {
        last[0] = 'RANGE';
        last.op = id;
        return id.length;
      } else if (__in(']', this.closes)) {
        this.token('TO', id);
        return id.length;
      }
      break;
    case 'by':
      if (last[0] === 'STRNUM' && (__ref = this.tokens)[__ref.length - 2][0] === 'RANGE' && (__ref = this.tokens)[__ref.length - 3][0] === '[') {
        tag = 'RANGE_BY';
      } else if (__in(']', this.closes)) {
        tag = 'BY';
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
  if ((tag == 'COMPARE' || tag == 'LOGIC' || tag == 'RELATION') && last[0] === '(') {
    tag = tag === 'RELATION' ? 'BIOPR' : 'BIOP';
  }
  if (tag == 'RELATION' || tag == 'THEN' || tag == 'ELSE' || tag == 'CASE' || tag == 'DEFAULT' || tag == 'CATCH' || tag == 'FINALLY' || tag == 'IN' || tag == 'OF' || tag == 'FROM' || tag == 'TO' || tag == 'BY' || tag == 'EXTENDS') {
    this.unline();
  }
  this.token(tag, id);
  return input.length;
}