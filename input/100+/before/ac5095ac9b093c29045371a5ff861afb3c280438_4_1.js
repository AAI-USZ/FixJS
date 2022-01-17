function(singular, plural) {
      var singularFirst      = singular.first(),
          singularRest       = singular.from(1),
          pluralFirst        = plural.first(),
          pluralRest         = plural.from(1),
          pluralFirstUpper   = pluralFirst.toUpperCase(),
          pluralFirstLower   = pluralFirst.toLowerCase(),
          singularFirstUpper = singularFirst.toUpperCase(),
          singularFirstLower = singularFirst.toLowerCase();
      removeFromArray(uncountables, singular);
      removeFromArray(uncountables, plural);
      if(singularFirstUpper == pluralFirstUpper) {
        Inflector.plural(new RegExp('({1}){2}$'.assign(singularFirst, singularRest), 'i'), '$1' + pluralRest);
        Inflector.plural(new RegExp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + pluralRest);
        Inflector.singular(new RegExp('({1}){2}$'.assign(pluralFirst, pluralRest), 'i'), '$1' + singularRest);
      } else {
        Inflector.plural(new RegExp('{1}{2}$'.assign(singularFirstUpper, singularRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(singularFirstLower, singularRest)), pluralFirstLower + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), pluralFirstUpper + pluralRest);
        Inflector.plural(new RegExp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), pluralFirstLower + pluralRest);
        Inflector.singular(new RegExp('{1}{2}$'.assign(pluralFirstUpper, pluralRest)), singularFirstUpper + singularRest);
        Inflector.singular(new RegExp('{1}{2}$'.assign(pluralFirstLower, pluralRest)), singularFirstLower + singularRest);
      }
    }