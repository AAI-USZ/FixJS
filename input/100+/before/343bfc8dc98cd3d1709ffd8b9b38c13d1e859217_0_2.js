function (returnErrors) {
          if (returnErrors) {
            return warnings
              .slice(0)
              .sort(byPriority)
              .map(function (v) {
                v.fixable && (v.fix = fixError(copyResults(v, config), code));
                return v;
              });
          } else {
            results.forEach(fixErrors(code, config));
            return code.getCode();
          }
        }