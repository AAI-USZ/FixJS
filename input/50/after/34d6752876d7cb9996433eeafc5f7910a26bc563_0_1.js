function (line) {
          var match = line.match(/^([ \t]+).*/);
          if (match != null) {
            var i = match[1].length;            
            if (i < min) min = i;
          }
        }