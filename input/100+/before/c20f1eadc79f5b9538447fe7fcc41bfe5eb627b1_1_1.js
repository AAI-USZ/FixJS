function(obj, indent_level, indent_baseline) {
      var c, chunk, delta, i, i_delta, ind, interp, item, lbreak, line, lineno, lines, part, res, s, t_int, temp_indent_level, zone_baseline, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
      res = "";
      i_delta = 0;
      switch (obj[0]) {
        case "INDENTED_TOFFEE_ZONE":
          indent_level += TAB_SPACES;
          _ref = obj[1];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            item = _ref[_i];
            _ref1 = this._toCoffeeRecurse(item, indent_level, indent_baseline), s = _ref1[0], delta = _ref1[1];
            res += s;
          }
          break;
        case "TOFFEE_ZONE":
          res += "\n" + (this._space(indent_level)) + "__toffee.state  = states.TOFFEE";
          _ref2 = obj[1];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            item = _ref2[_j];
            _ref3 = this._toCoffeeRecurse(item, indent_level, indent_baseline), s = _ref3[0], delta = _ref3[1];
            res += s;
          }
          break;
        case "COFFEE_ZONE":
          res += "\n" + (this._space(indent_level)) + "__toffee.state = states.COFFEE";
          zone_baseline = this._getZoneBaseline(obj[1]);
          temp_indent_level = indent_level;
          _ref4 = obj[1];
          for (_k = 0, _len2 = _ref4.length; _k < _len2; _k++) {
            item = _ref4[_k];
            _ref5 = this._toCoffeeRecurse(item, temp_indent_level, zone_baseline), s = _ref5[0], delta = _ref5[1];
            res += s;
            temp_indent_level = indent_level + delta;
          }
          break;
        case "TOFFEE":
          ind = indent_level;
          res += "\n" + (this._space(ind)) + "__toffee.state = states.TOFFEE";
          t_int = utils.interpolateString(obj[1]);
          lineno = obj[2];
          for (_l = 0, _len3 = t_int.length; _l < _len3; _l++) {
            part = t_int[_l];
            if (part[0] === "TOKENS") {
              res += this._printLineNo(lineno, ind);
              interp = part[1].replace(/^[\n \t]+/, '');
              if (interp.slice(0, 5) === 'json|') {
                chunk = "\#{jsonEscape(" + interp.slice(5) + ")}";
              } else if (interp.slice(0, 4) === 'raw|') {
                chunk = "\#{" + interp.slice(4) + "}";
              } else if (interp.slice(0, 5) === 'html|') {
                chunk = "\#{htmlEscape(" + interp.slice(5) + ")}";
              } else {
                chunk = "\#{escape(" + interp + ")}";
              }
              res += "\n" + (this._space(ind)) + "__toffee.out.push " + (this._quoteStr(chunk));
              lineno += part[1].split("\n").length - 1;
            } else {
              lines = part[1].split("\n");
              for (i = _m = 0, _len4 = lines.length; _m < _len4; i = ++_m) {
                line = lines[i];
                res += this._printLineNo(lineno, ind);
                lbreak = i !== lines.length - 1 ? "\n" : "";
                chunk = this._escapeForStr("" + line + lbreak);
                if (chunk.length) {
                  res += "\n" + (this._space(ind)) + "__toffee.out.push " + (this._quoteStr(chunk + lbreak));
                }
                if (i < lines.length - 1) {
                  lineno++;
                }
              }
            }
          }
          res += this._printLineNo(obj[2] + (obj[1].split('\n').length - 1), ind);
          res += "\n" + (this._space(ind)) + "__toffee.state = states.COFFEE";
          break;
        case "COFFEE":
          c = obj[1];
          res += "\n" + (this._reindent(c, indent_level, indent_baseline));
          i_delta = this._getIndentationDelta(c, indent_baseline);
          break;
        default:
          throw "Bad parsing. " + obj + " not handled.";
          return ["", 0];
      }
      return [res, i_delta];
    }