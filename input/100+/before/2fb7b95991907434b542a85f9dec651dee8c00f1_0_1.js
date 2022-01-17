function (locale) {
        return path.resolve(
             path.join(__dirname, '..'),
                       options.locale_directory,
                       path.join(locale, 'LC_MESSAGES', 'messages.mo'));
      }