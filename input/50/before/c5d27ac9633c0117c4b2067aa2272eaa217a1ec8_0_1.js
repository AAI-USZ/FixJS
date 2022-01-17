function(value, key) {
                keys.push(key);
                values.push(isFunction(value) ? $injector.invoke(value) : $injector.get(value));
              }