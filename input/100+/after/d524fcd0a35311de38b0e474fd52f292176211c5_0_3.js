function rgb(type, token) {
    if (type === 'number') {
      var s = parseInt(token, 10).toString(16).toLowerCase();
      if (s.length < 2) { s = '0' + s; }
      buf.push(s);
    } else if (type === '(') {
      if (prev === 'number') { q(' '); }
      q('#');
      buf = [];
    } else if (type === ')') {
      if (buf.length === 3 && buf[0][0] === buf[0][1] && buf[1][0] === buf[1][1] && buf[2][0] === buf[2][1]) {
        buf[0] = buf[0][0];
        buf[1] = buf[1][0];
        buf[2] = buf[2][0];
      }
      q(buf.join(''));
      // reset handler to default
      parser.token = handle;
    }
  }