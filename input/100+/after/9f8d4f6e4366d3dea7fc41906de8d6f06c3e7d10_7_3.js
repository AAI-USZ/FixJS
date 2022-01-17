function nextTok(str) {
    var m, rest, tok;
    m = str.match(tokenPat);
    if (!m) {
      return [str, ''];
    } else if (m.index > 0) {
      return [str.substring(0, m.index), str.substring(m.index)];
    } else {
      tok = m[0];
      if (tok[0][0] === "'") {
        tok = '"' + tok.substring(1, tok.length - 1).replace(/[\\]?./g, function(s) {
          if (s[0] === '"') {
            return '\\"';
          } else {
            return s;
          }
        }) + '"';
      }
      rest = str.substring(m.index + m[0].length);
      if (tok[0] === '#' || tok[0] === ' ' || (tok[0] === '\n' && rest[0] === '\n')) {
        return nextTok(rest);
      } else {
        return [tok, rest];
      }
    }
  }