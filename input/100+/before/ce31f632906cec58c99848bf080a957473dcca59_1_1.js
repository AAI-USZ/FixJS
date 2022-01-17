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

    var gt;

    if (translations[locale]) {
      gt = function(sid) {
        return (translations[locale][sid] ? translations[locale][sid][1] : sid);
      };
    } else {
      gt = function(a) { return a; }
    }
    resp.local(options.gettext_alias, gt);
    req.gettext = gt;

    next();
  }