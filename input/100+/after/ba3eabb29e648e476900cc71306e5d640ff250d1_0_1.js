function(f) {
        if (handler && typeof handler === 'function') {
            try { signal.disconnect(handler); }
            catch (e) {}
        }

        if (typeof f === 'function') {
            handler = function(message, stack) {
              stack = JSON.parse(stack).map(function(item) {
                  return { file: item.url, line: item.lineNumber, function: item.functionName }
              });

              f(message, stack);
            };
            signal.connect(handler);
        } else {
            handler = null;
        }
    }