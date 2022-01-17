function(line) {
          var l = line.text;
          if (l.length > maxLineLength) {
            maxLine = l; maxLineLength = l.length; maxWidth = null;
            recomputeMaxLength = false;
          }
        }