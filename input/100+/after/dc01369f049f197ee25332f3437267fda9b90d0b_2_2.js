function parseGroup(str, indent, totalLen) {
      var rest, tok, _ref,
        _this = this;
      if (!str) {
        return [lexDlempty, null, str];
      } else {
        _ref = this.nextTok(str), tok = _ref[0], rest = _ref[1];
        if (!tok || (tok[0] === '\n' && tok.length <= indent.length) || this.groupCloses[tok]) {
          return [lexDlempty, null, str];
        } else {
          return ifParsed(this.parseGroupTerm(tok, rest, indent, totalLen), function(term, rest2) {
            return ifParsed(_this.parseGroup(rest2, indent, totalLen), function(group, rest3) {
              return [lexDlappend(term, group), null, rest3];
            });
          });
        }
      }
    }