function () {
              return {
                original: code._src[r.line],
                replacement: fixError(r, code)
              };
            }