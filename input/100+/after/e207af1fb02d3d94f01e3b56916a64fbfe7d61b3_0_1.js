function() {

  var defaultPluralExpr = function(n) { return n == 1 ? 0 : 1; };
  var formatRegex = /%(?:(?:\(([^\)]+)\))?([disr])|%)/g;
  var translations = {};
  var merged;

  /**
   * A translations object implementing the gettext interface
   */
  var Translations = this.Translations = function(locale, domain) {
    this.messages = {};
    this.locale = locale || 'unknown';
    this.domain = domain || 'messages';
    this.pluralexpr = defaultPluralExpr;
  };

  /**
   * Create a new translations object from the catalog and return it.
   * See the babel-module comment for more details.
   */
  Translations.load = function(catalog) {
    var rv = new Translations();
    rv.load(catalog);
    translations[rv.domain] = rv;
    merged.load(catalog);
    return rv;
  };

  /**
   * Get a Translations instance from the loaded translations. If the
   * specified domain doesn't exist, returns a dummy Translations
   * instance.
   */
  Translations.get = function(domain) {
    return translations[domain] || (new Translations({domain: domain}));
  };

  Translations.prototype = {
    /**
     * translate a single string
     *
     * If extra parameters are given, use them to fill the format
     * specified by the string.
     */
    gettext: function(string) {
      var translated = this.messages[string];
      if (typeof translated == 'undefined')
        translated = string;
      else if (typeof translated != 'string')
        translated = translated[0];
      if (arguments.length > 1) {
        arguments[0] = translated;
        return babel.format.apply(this, arguments);
      }
      return translated;
    },

    /**
     * translate a pluralizable string
     *
     * If extra parameters are given, use them to fill the format
     * specified by the string.
     */
    ngettext: function(singular, plural, n) {
      var translated = this.messages[singular];
      if (typeof translated == 'undefined')
        translated = (n == 1) ? singular : plural;
      else
        translated = translated[this.pluralexpr(n)];
      if (arguments.length > 3) {
        var format_args = Array.prototype.slice.call(arguments, 3);
        format_args.unshift(translated);
        return babel.format.apply(this, format_args)
      }
      return translated;
    },

    /**
     * Install this translation document wide.  After this call, there are
     * three new methods on the window object: _, gettext and ngettext
     */
    install: function() {
      window._ = window.gettext = function() {
        return merged.gettext.apply(merged, arguments);
      };
      window.ngettext = function(singular, plural, n) {
        return merged.ngettext.apply(merged, arguments);
      };
      return this;
    },

    /**
     * Works like Translations.load but updates the instance rather
     * then creating a new one.
     */
    load: function(catalog) {
      if (catalog.messages)
        this.update(catalog.messages)
      if (catalog.plural_expr)
        this.setPluralExpr(catalog.plural_expr);
      if (catalog.locale)
        this.locale = catalog.locale;
      if (catalog.domain)
        this.domain = catalog.domain;
      return this;
    },

    /**
     * Updates the translations with the object of messages.
     */
    update: function(mapping) {
      for (var key in mapping)
        if (mapping.hasOwnProperty(key))
          this.messages[key] = mapping[key];
      return this;
    },

    /**
     * Sets the plural expression
     */
    setPluralExpr: function(expr) {
      this.pluralexpr = new Function('n', 'return +(' + expr + ')');
      return this;
    }
  };

  merged = new Translations({});

  /**
   * Translate a single string in the specified domain.
   *
   * If extra parameters are given, use them to fill the format
   * specified by the string.
   */
  window.dgettext = this.dgettext = function(domain, string) {
    var rv = translations[domain];
    var args = Array.prototype.slice.call(arguments, 1);
    if (typeof rv != 'undefined')
      return rv.gettext.apply(rv, args);
    if (arguments.length > 1)
      return babel.format.apply(this, args);
    return string;
  };

  /**
   * Translate a pluralizable string in the specified domain.
   *
   * If extra parameters are given, use them to fill the format
   * specified by the string.
   */
  window.dngettext = this.dngettext = function(domain, singular, plural, n) {
    var rv = translations[domain];
    if (typeof rv != 'undefined') {
      var args = Array.prototype.slice.call(arguments, 1);
      return rv.ngettext.apply(rv, args);
    }
    if (arguments.length > 4) {
      var args = Array.prototype.slice.call(arguments, 4);
      args.unshift(singular);
      return babel.format.apply(this, format_args)
    }
    return (n == 1) ? singular : plural;
  };

  /**
   * A python inspired string formatting function.  Supports named and
   * positional placeholders and "s", "d" and "i" as type characters
   * without any formatting specifications.
   *
   * Examples::
   *
   *    babel.format(_('Hello %s'), name)
   *    babel.format(_('Progress: %(percent)s%%'), {percent: 100})
   */
  this.format = function() {
    var arg, string = arguments[0], idx = 0;
    if (arguments.length == 1)
      return string;
    else if (arguments.length == 2 && typeof arguments[1] == 'object')
      arg = arguments[1];
    else {
      arg = [];
      for (var i = 1, n = arguments.length; i != n; ++i)
        arg[i - 1] = arguments[i];
    }
    return string.replace(formatRegex, function(all, name, type) {
      if (all == '%%') return '%';
      var value = arg[name || idx++];
      return (type == 'i' || type == 'd') ? +value : value;
    });
  }

}