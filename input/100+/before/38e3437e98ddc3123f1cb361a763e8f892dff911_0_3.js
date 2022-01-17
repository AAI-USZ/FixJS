function(comparator) {
        if (!comparator) {
          throw new Error('Cannot sort without a comparator');
        } else if (_.isFunction(comparator)) {
          return comparator;
        } else if (_.isArray(comparator)) {
          return function(a, b) {
            var comparison, key, value, _i, _len;
            comparison = 0;
            for (key = _i = 0, _len = comparator.length; _i < _len; key = ++_i) {
              value = comparator[key];
              comparison = generateFunction(value)(a, b);
              if (comparison) {
                return comparison;
              }
            }
            return comparison;
          };
        } else if (_.isObject(comparator)) {
          return function(a, b) {
            var aValue, bValue, comparison, key, value, _ref, _ref1;
            comparison = 0;
            for (key in comparator) {
              if (!__hasProp.call(comparator, key)) continue;
              value = comparator[key];
              aValue = (_ref = typeof a.get === "function" ? a.get(key) : void 0) != null ? _ref : a[key];
              bValue = (_ref1 = typeof b.get === "function" ? b.get(key) : void 0) != null ? _ref1 : b[key];
              if (aValue === bValue) {
                comparison = 0;
              } else if (aValue < bValue) {
                comparison = -1;
              } else if (aValue > bValue) {
                comparison = 1;
              }
              if (value === -1) {
                comparison *= -1;
              }
              if (comparison) {
                return comparison;
              }
            }
            return comparison;
          };
        } else {
          throw new Error('Unknown comparator type');
        }
      }