function parse_directive() {
        var result0;
        
        reportFailures++;
        result0 = parse_valueDirective();
        if (result0 === null) {
          result0 = parse_pathDirective();
          if (result0 === null) {
            result0 = parse_simpleDirective();
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("directive");
        }
        return result0;
      }