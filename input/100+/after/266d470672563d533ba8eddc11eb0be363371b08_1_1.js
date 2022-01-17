function parse_character() {
        var result0;
        
        reportFailures++;
        if (/^[^\n]/.test(input.charAt(pos.offset))) {
          result0 = input.charAt(pos.offset);
          advance(pos, 1);
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[^\\n]");
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("character");
        }
        return result0;
      }