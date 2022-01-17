function(line, no) {
        if (line.hidden != hidden) {
          line.hidden = hidden;
          if (!options.lineWrapping) {
            var l = line.text;
            if (hidden && l.length == maxLine.length) {
              updateMaxLine = true;
            } else if (!hidden && l.length > maxLine.length) {
              maxLine = l; updateMaxLine = false;
            }
          }
          updateLineHeight(line, hidden ? 0 : 1);
          var fline = sel.from.line, tline = sel.to.line;
          if (hidden && (fline == no || tline == no)) {
            var from = fline == no ? skipHidden({line: fline, ch: 0}, fline, 0) : sel.from;
            var to = tline == no ? skipHidden({line: tline, ch: 0}, tline, 0) : sel.to;
            // Can't hide the last visible line, we'd have no place to put the cursor
            if (!to) return;
            setSelection(from, to);
          }
          return (gutterDirty = true);
        }
      }