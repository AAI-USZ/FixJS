function expandLiterals(tokens){
  var i, token, sig, next, lno, from, char, to, tochar, by, byp, ts, enc, add, n, word, that, __ref, __i, __len;
  i = 0;
  while (token = tokens[++i]) {
    switch (token[0]) {
    case 'STRNUM':
      if (~'-+'.indexOf(sig = token[1].charAt(0))) {
        token[1] = token[1].slice(1);
        tokens.splice(i++, 0, ['+-', sig, token[2]]);
      }
      if (token.callable) {
        continue;
      }
      break;
    case 'RANGE':
      next = tokens[i + 1];
      lno = token[2];
      __ref = decode(token[1], lno), from = __ref[0], char = __ref[1];
      __ref = next[0] === 'STRNUM' && decode(next[1], lno), to = __ref[0], tochar = __ref[1];
      if (to == null || char ^ tochar) {
        carp('bad "to" in range', lno);
      }
      by = 1;
      if (byp = ((__ref = tokens[i + 2]) != null ? __ref[0] : void 8) === 'RANGE_BY') {
        if (!(by = +((__ref = tokens[i + 3]) != null ? __ref[1] : void 8))) {
          carp('bad "by" in range', tokens[i + 2][2]);
        }
      }
      ts = [];
      enc = char ? character : String;
      add = __fn;
      if (token.op === 'to') {
        for (n = from; by < 0 ? n >= to : n <= to; n += by) {
          add();
        }
      } else {
        for (n = from; by < 0 ? n > to : n < to; n += by) {
          add();
        }
      }
      ts.pop() || carp('empty range', lno);
      tokens.splice.apply(tokens, [i, 2 + 2 * byp].concat(__slice.call(ts)));
      i += ts.length - 1;
      break;
    case 'WORDS':
      ts = [['[', '[', lno = token[2]]];
      for (__i = 0, __len = (__ref = token[1].match(/\S+/g) || '').length; __i < __len; ++__i) {
        word = __ref[__i];
        ts.push(['STRNUM', string('\'', word), lno], [',', ',', lno]);
      }
      tokens.splice.apply(tokens, [i, 1].concat(__slice.call(ts), [[']', ']', lno]]));
      i += ts.length;
      break;
    case 'INDENT':
      if (that = tokens[i - 1]) {
        if (that[1] === 'new') {
          tokens.splice(i++, 0, ['PARAM(', '', token[2]], [')PARAM', '', token[2]], ['->', '', token[2]]);
        } else if ((__ref = that[0]) === 'FUNCTION' || __ref === 'LET') {
          tokens.splice(i, 0, ['CALL(', '', token[2]], [')CALL', '', token[2]]);
          i += 2;
        }
      }
      continue;
    case 'LITERAL':
    case '}':
    case '!?':
      break;
    case ')':
    case ')CALL':
      if (token[1]) {
        continue;
      }
      break;
    case ']':
      if (token.index) {
        continue;
      }
      break;
    case 'CREMENT':
      if (!able(tokens, i)) {
        continue;
      }
      break;
    default:
      continue;
    }
    if (token.spaced && __of(tokens[i + 1][0], ARG)) {
      tokens.splice(++i, 0, [',', ',', token[2]]);
    }
  }
  function __fn(){
    if (0x10000 < ts.push(['STRNUM', enc(n), lno], [',', ',', lno])) {
      carp('range limit exceeded', lno);
    }
  }}
