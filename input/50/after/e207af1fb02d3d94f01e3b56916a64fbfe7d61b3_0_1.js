function(catalog) {
    var rv = new Translations();
    rv.load(catalog);
    translations[rv.domain] = rv;
    merged.load(catalog);
    return rv;
  }