function(obj, indent_level, indent_baseline) {
      var c, delta, i, i_delta, item, lbreak, line, lines, res, s, temp_indent_level, zone_baseline, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
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
          res += "\n" + (this._space(indent_level)) + "__toffee.lineno = " + obj[2];
          res += "\n" + (this._space(indent_level)) + "__toffee.state = states.TOFFEE";
          lines = obj[1].split("\n");
          for (i = _l = 0, _len3 = lines.length; _l < _len3; i = ++_l) {
            line = lines[i];
            if (!line.match(/#/)) {
              if (i) {
                res += "\n" + (this._space(indent_level)) + "__toffee.lineno = " + (obj[2] + i);
              }
              lbreak = i !== lines.length - 1 ? "\n" : "";
              res += ("\n" + (this._space(indent_level)) + "__toffee.out.push ") + '"""' + this._escapeForStr(line + lbreak) + '"""';
            } else {
              res += ("\n" + (this._space(indent_level)) + "__toffee.out.push ") + '"""' + this._escapeForStr(lines.slice(i).join("\n")) + '"""';
              break;
            }
          }
          res += "\n" + (this._space(indent_level)) + "__toffee.lineno = " + (obj[2] + (obj[1].split('\n').length - 1));
          res += "\n" + (this._space(indent_level)) + "__toffee.state = states.COFFEE";
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