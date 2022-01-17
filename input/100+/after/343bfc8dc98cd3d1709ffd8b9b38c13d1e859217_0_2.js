function (returnErrors) {
          var dup = {};
          if (returnErrors) {
            return warnings
              .slice(0)
              .sort(byPriority)
              .map(function (v) {
                v.fixable && (v.fix = fixError(copyResults(v, config), code));
                return v;
              })
              .reverse()
              .filter(function (x) {
                var key = x.evidence + x.reason;
                if (dup.hasOwnProperty(key)) {
                  return false;
                }
                dup[key] = x;
                return true;
              })
              .reverse();
          } else {
            results.forEach(fixErrors(code, config));
            return code.getCode();
          }
        }