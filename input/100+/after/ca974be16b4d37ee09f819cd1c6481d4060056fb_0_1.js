function addDateInputFormat(format, match, locale, variant, front) {
    DateInputFormats[front ? 'unshift' : 'push']({
      variant: variant,
      locale: locale,
      reg: regexp('^' + format + '$', 'i'),
      to: match
    });
  }