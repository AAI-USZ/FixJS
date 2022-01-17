function() {
      var c, index, out, raw, t, tokens, _i, _len, _results;
      raw = $(workspace).text();
      $(workspace).html('');
      out = "";
      index = 0;
      tokens = raw.tokens('(-+*/)');
      _results = [];
      for (_i = 0, _len = tokens.length; _i < _len; _i++) {
        t = tokens[_i];
        switch (t.type) {
          case 'number':
            c = 'number';
            break;
          case 'operator':
            c = 'operator';
            break;
          case 'name':
            c = 'comment';
        }
        e = document.createElement('span');
        $(e).addClass(c);
        $(e).html(t.value);
        $(e).appendTo(workspace);
        out += e;
        _results.push(index += t.value.length);
      }
      return _results;
    }