function(value, key) {
                keys.push(key);
                values.push(isString(value) ? $injector.get(value) : $injector.invoke(value));
              }