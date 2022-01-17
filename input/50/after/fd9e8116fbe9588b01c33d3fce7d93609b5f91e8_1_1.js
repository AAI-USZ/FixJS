function buildDate() {
    English = date.setLocale('en');
    buildDateMethods();
    buildDateInputFormats();
    buildKanjiDigits();
    buildRelativeAliases();
    buildISOString('toISOString');
    buildISOString('toJSON');
    setDateProperties();
  }