function(str, tokens) {
      if (tokens === undef) {
        return str.split(/\s+/g);
      }

      var chars = tokens.split(/()/g),
          buffer = "",
          len = str.length,
          i, c,
          tokenized = [];

      for (i = 0; i < len; i++) {
        c = str[i];
        if (chars.indexOf(c) > -1) {
          if (buffer !== "") {
            tokenized.push(buffer);
          }
          buffer = "";
        } else {
          buffer += c;
        }
      }

      if (buffer !== "") {
        tokenized.push(buffer);
      }

      return tokenized;
    }