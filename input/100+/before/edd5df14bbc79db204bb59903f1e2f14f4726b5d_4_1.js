function(view) {
      var i, line, lineno, res, txt_lines, _i, _ref, _ref1;
      if (!view.error) {
        return "";
      } else {
        res = "<div style=\"border:1px solid #999;margin:10px;padding:10px;background-color:#fff;position:fixed;top:0;left:0;width:100%;z-index:9999;\">";
        res += "<b>" + (eh._ppEscape(view.error.converted_msg)) + "</b>";
        res += "\n  <br />--------<br />";
        res += "\n<div style=\"font-family:courier new;font-size:10pt;color:#900;\">";
        txt_lines = view.txt.split('\n');
        for (i = _i = _ref = view.error.toffee_line_range[0] - 3, _ref1 = view.error.toffee_line_range[1] + 1; _ref <= _ref1 ? _i < _ref1 : _i > _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
          if ((i < 0) || i > txt_lines.length - 1) {
            continue;
          }
          line = eh._ppEscape(txt_lines[i]);
          lineno = i + 1;
          res += "\n" + lineno + ": " + line + " <br />";
        }
        res += "\n</div>";
        res += "\n</div>";
        return res;
      }
    }