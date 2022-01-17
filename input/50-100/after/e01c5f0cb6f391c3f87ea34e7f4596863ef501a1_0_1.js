function(obj, number, options) {
        if (!_(number).isNumber()) {
          options = number;
          number = 0;
        }
        options = options || {};
        if (number === 1) {
          options.skip = obj;
        }
        options.skip = options.skip || '';
        return InflectionJS.apply_rules(obj, InflectionJS.plural_rules, options.skip);
      }