f  var str, parts, end0, pos, i, ch, id, stringified, delta, nested, clone, __ref;
  parts = [];
  end0 = end.charAt(0);
  pos = 0;
  i = -1;
  str = str.slice(idx + end.length);
  while (ch = str.charAt(++i)) {
    switch (ch) {
    case end0:
      if (end !== str.slice(i, i + end.length)) {
        continue;
      }
      parts.push(['S', this.countLines(str.slice(0, i)), this.line]);
      return parts.size = pos + i + end.length, parts;
    case '#':
      if (id = (ID.lastIndex = i + 1, ID).exec(str)[1]) {
        if (id === 'this') {
          break;
        }
        try {
          Function("'use strict'; var " + id);
          break;
        } catch (__e) {}
        this.carp("invalid variable interpolation \"" + id + "\"");
      }
      if ('{' !== str.charAt(i + 1)) {
        continue;
      }
      break;
    case '\\':
      ++i;
      // fallthrough
    default:
      continue;
    }
    if (i || nested && !stringified) {
      stringified = parts.push(['S', this.countLines(str.slice(0, i)), this.line]);
    }
    if (id) {
      str = str.slice(delta = i + 1 + id.length);
      parts.push(['TOKENS', nested = [['ID', id, this.line]]]);
    } else {
      clone = (__ref = __clone(exports), __ref.inter = true, __ref.emender = this.emender, __ref);
      nested = clone.tokenize(str.slice(i + 2), {
        line: this.line,
        raw: true
      });
      delta = str.length - clone.rest.length;
      str = clone.rest, this.line = clone.line;
      while (((__ref = nested[0]) != null ? __ref[0] : void 8) === 'NEWLINE') {
        nested.shift();
      }
      if (nested.length) {
        nested.unshift(['(', '(', nested[0][2]]);
        nested.push([')', ')', this.line]);
        parts.push(['TOKENS', nested]);
      }
    }
    pos += delta;
    i = -1;
  }
  this.carp("missing `" + end + "`");
};
