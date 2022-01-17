function nextTok(str) {
    var m, rest;
    m = str.match(tokenPat);
    if (!m) {
      return [str, ''];
    } else if (m.index > 0) {
      return [str.substring(0, m.index), str.substring(m.index)];
    } else {
      if (m[0][0] === "'") {
        m[0] = "\"" + (m[0].substring(1, m[0].length - 1)) + "\"";
      }
      rest = str.substring(m.index + m[0].length);
      if (m[0][0] === '#' || m[0][0] === ' ' || (m[0][0] === '\n' && rest[0] === '\n')) {
        return nextTok(rest);
      } else {
        return [m[0], rest];
      }
    }
  }