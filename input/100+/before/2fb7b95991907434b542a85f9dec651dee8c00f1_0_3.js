function(req, resp, next) {
    var langs = parseAcceptLanguage(req.headers['accept-language']),
        lang_dir,
        lang = bestLanguage(langs, options.supported_languages,
                            options.default_lang),
        debug_lang = options.debug_lang.toLowerCase(),
        locale;

    if (lang && lang.toLowerCase && lang.toLowerCase() == debug_lang) {
        lang = 'db-LB'; // What? http://www.youtube.com/watch?v=rJLnGjhPT1Q
    }

    resp.local('lang', lang);

    // BIDI support, which direction does text flow?
    lang_dir = BIDI_RTL_LANGS.indexOf(lang) >= 0 ? 'rtl' : 'ltr';
    resp.local('lang_dir', lang_dir);
    req.lang = lang;

    locale = localeFrom(lang);

    resp.local('locale', locale);
    req.locale = locale;

    resp.local('format', format);
    req.format = format;

    if (mo_cache[locale].mo_exists) {
      if (mo_cache[locale].gt === null) {
        mo_cache[locale].gt = new Gettext();
        var mo_path = mo_file_path(locale);
        mo_cache[locale].gt.addTextdomain(locale,
                                           fs.readFileSync(mo_path));
        mo_cache[locale].gt.textdomain(locale);
      }
      var gt = mo_cache[locale].gt;
      resp.local(options.gettext_alias, gt.gettext.bind(gt));
      req.gettext = gt.gettext.bind(gt);
      resp.local(options.ngettext_alias, gt.ngettext.bind(gt));
      req.ngettext = gt.ngettext.bind(gt);
   } else {
      // en-US in a non gettext environment... fake it
      var identity = function (a, b) { return a; };
      resp.local(options.gettext_alias, identity);
      req.gettext = identity;
      resp.local(options.ngettext_alias, identity);
      req.ngettext = identity;
    }
    next();
  }