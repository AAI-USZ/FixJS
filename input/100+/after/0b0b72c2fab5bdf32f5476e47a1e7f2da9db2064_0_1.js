function(err, rv) {
    self.resume();

    if (err) {
      // XXX Log it somewhere?
      return;
    }

    var completions = rv[0],
        completeOn = rv[1];  // the text that was completed
    if (completions && completions.length) {
      // Apply/show completions.
      if (completions.length === 1) {
        self._insertString(completions[0].slice(completeOn.length));
      } else {
        self.output.write('\r\n');
        var width = completions.reduce(function(a, b) {
          return a.length > b.length ? a : b;
        }).length + 2;  // 2 space padding
        var maxColumns = Math.floor(self.columns / width) || 1;
        var group = [], c;
        for (var i = 0, compLen = completions.length; i < compLen; i++) {
          c = completions[i];
          if (c === '') {
            handleGroup.call(self, group);
            group = [];
          } else {
            group.push(c);
          }
        }
        handleGroup.call(self, group);

        // If there is a common prefix to all matches, then apply that
        // portion.
        var f = completions.filter(function(e) { if (e) return e; });
        var prefix = commonPrefix(f);
        if (prefix.length > completeOn.length) {
          self._insertString(prefix.slice(completeOn.length));
        }

      }
      self._refreshLine();
    }
  }