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

        function handleGroup(group) {
          if (group.length == 0) {
            return;
          }
          var minRows = Math.ceil(group.length / maxColumns);
          for (var row = 0; row < minRows; row++) {
            for (var col = 0; col < maxColumns; col++) {
              var idx = row * maxColumns + col;
              if (idx >= group.length) {
                break;
              }
              var item = group[idx];
              self.output.write(item);
              if (col < maxColumns - 1) {
                for (var s = 0, itemLen = item.length; s < width - itemLen;
                     s++) {
                  self.output.write(' ');
                }
              }
            }
            self.output.write('\r\n');
          }
          self.output.write('\r\n');
        }

        var group = [], c;
        for (var i = 0, compLen = completions.length; i < compLen; i++) {
          c = completions[i];
          if (c === '') {
            handleGroup(group);
            group = [];
          } else {
            group.push(c);
          }
        }
        handleGroup(group);

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