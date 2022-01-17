function(obj, options) {
        options = options || {};
        options.skip = options.skip || '';
        return InflectionJS.apply_rules(obj, InflectionJS.plural_rules, options.skip);
      }