function (locale) {
        return path.resolve(
             path.join(__dirname, '..'),
                       path.join(options.i18n_json_dir, locale, 'client.json'));
      }