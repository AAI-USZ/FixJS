function (line) {
          var match = line.match(/^ */);
          var i = match[0].length;
          if (i < min) min = i;
        }