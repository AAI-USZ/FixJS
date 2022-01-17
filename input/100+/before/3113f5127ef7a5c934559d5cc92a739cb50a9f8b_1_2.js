function (options) {

  if (! options.gettext_alias)        options.gettext_alias = 'gettext';
  if (! options.ngettext_alias)       options.ngettext_alias = 'ngettext';
  if (! options.supported_languages)  options.supported_languages = ['en-US'];
  if (! options.default_lang)         options.default_lang = 'en-US';
  if (! options.debug_lang)           options.debug_lang = 'it-CH';
  if (! options.disable_locale_check) options.disable_locale_check = false;
  if (! options.locale_directory)     options.locale_directory = 'locale';
  if (! options.i18n_json_dir)        options.i18n_json_dir = 'resources/static/i18n/';

  var json_dir = path.resolve(
          path.join(__dirname, '..'),
          path.join(options.i18n_json_dir));

  var debug_locale = localeFrom(options.debug_lang);

  options.supported_languages.forEach(function (lang, i) {
    var l = (lang === options.debug_lang ? 'db_LB' : localeFrom(lang));

    // ignore .json files for en-US
    if (lang == 'en-US') return;

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
  };
}