function (lang, i) {
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
  }