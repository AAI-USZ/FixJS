function addDateInputFormat(format, match, locale, variant, method) {
    method = method || 'push';
    DateInputFormats[method]({
      variant: variant,
      locale: locale,
      reg: regexp('^' + format + '$', 'i'),
      to: match
    });
  }