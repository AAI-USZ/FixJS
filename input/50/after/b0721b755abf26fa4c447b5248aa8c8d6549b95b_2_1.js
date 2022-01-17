function langContext(req) {
  return {
    lang: req.lang,
    locale: req.locale,
    gettext: req.gettext,
    ngettext: req.ngettext,
    format: req.format
  };
}