function (options) {
  if (! options.gettext_alias)          options.gettext_alias = 'gettext';
  if (! options.supported_languages)    options.supported_languages = ['en-US'];
  if (! options.default_lang)           options.default_lang = 'en-US';
  if (! options.debug_lang)             options.debug_lang = 'it-CH';
  if (! options.disable_locale_check)   options.disable_locale_check = false;
  if (! options.translation_directory)  options.i18n_json_dir = 'l10n/';

  var json_dir = path.resolve(
          path.join(__dirname, '..'),
          path.join(options.translation_directory));

  var debug_locale = localeFrom(options.debug_lang);

  options.supported_languages.forEach(function (lang, i) {
    // ignore .json files for default and debug languages
    if (options.default_lang == lang || options.debug_lang == lang) return;

    var l = localeFrom(lang);

    try {
      // populate the in-memory translation cache with client.json, which contains
      // strings relevant on the server

      // XXX: these files should be json.  not javascript.
      var json_locale_data; // for jshint
      eval(fs.readFileSync(path.join(json_dir, l, 'messages.json')).toString());
      translations[l] = json_locale_data.messages;

      // verify that client.json is present
      if (!existsSync(path.join(json_dir, l, 'client.json'))) {
        throw 'client.json';
      }
    } catch(e) {
      // an exception here means that there was a problem with the translation files for
      // this locale!
      var msg = util.format('Bad locale=[%s] missing .json files in [%s]. See locale/README (%s)',
                            l, path.join(json_dir, l), e);
      if (!options.disable_locale_check) {
        logger.warn(msg);
      } else {
        logger.error(msg);
        throw msg;
      }
    }
  });

  return function(req, resp, next) {
    var langs = parseAcceptLanguage(req.headers['accept-language']),
        lang_dir,
        lang = bestLanguage(langs, options.supported_languages,
                            options.default_lang),
        debug_lang = options.debug_lang.toLowerCase(),
        locale;

    resp.local('lang', lang);

    // BIDI support, which direction does text flow?
    lang_dir = ((BIDI_RTL_LANGS.indexOf(lang) >= 0) || debug_lang == lang) ? 'rtl' : 'ltr';
    resp.local('lang_dir', lang_dir);
    req.lang = lang;

    locale = localeFrom(lang);

    resp.local('locale', locale);
    req.locale = locale;

    resp.local('format', format);
    req.format = format;

    var gt;

    if (lang.toLowerCase() === debug_lang) {
      gt = gobbledygook;
      resp.local('lang', 'db-LB');
    } else if (translations[locale]) {
      gt = function(sid) {
        if (translations[locale][sid] && translations[locale][sid][1].length) {
          sid = translations[locale][sid][1];
        }
        return sid;
      };
    } else {
      gt = function(a) { return a; }
    }
    resp.local(options.gettext_alias, gt);
    req.gettext = gt;

    next();
  };
}