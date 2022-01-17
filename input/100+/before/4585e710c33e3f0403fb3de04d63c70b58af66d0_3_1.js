function (lang, i) {
    var l = localeFrom(lang),
        default_locale = localeFrom(options.default_lang);

    mo_cache[l] = {
      mo_exists: path.existsSync(mo_file_path(l)),
      json_exists: path.existsSync(json_file_path(l)),
      gt: null
    };
    if (l !== debug_locale) {
      if (! mo_cache[l] || ! mo_cache[l].mo_exists || ! mo_cache[l].json_exists) {
        var msg = util.format('Bad locale=[%s] file(s) do not exist [%s] or [%s]. See locale/README',
                              l, mo_file_path(l), json_file_path(l));
        if (mo_cache[l].json_exists && l == default_locale) {
          // mo files aren't critical... carry on
          if (! options.disable_locale_check) logger.warn(msg);
        } else {
          logger.error(msg);
          throw msg;
        }
      }
    }
  }