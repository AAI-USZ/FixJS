function(message, stack) {
              stack = JSON.parse(stack).map(function(item) {
                  return { file: item.url, line: item.lineNumber, function: item.functionName }
              });

              f(message, stack);
            }