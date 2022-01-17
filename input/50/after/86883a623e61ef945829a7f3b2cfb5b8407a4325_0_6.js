function(line) {
          var l = line.text;
          if (!line.hidden && l.length > maxLineLength) {
            maxLine = l; maxLineLength = l.length; maxLineChanged = true;
            recomputeMaxLength = false;
          }
        }