function(line) {
          if (!line.hidden && line.text.length == maxLineLength) {recomputeMaxLength = true; return true;}
        }