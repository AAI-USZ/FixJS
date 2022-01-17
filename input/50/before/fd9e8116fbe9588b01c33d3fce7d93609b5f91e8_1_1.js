function buildDate() {
    English = date.setLocale('en');
    buildDateMethods();
    buildDateInputFormats();
    buildRelativeAliases();
    buildISOString('toISOString');
    buildISOString('toJSON');
    setDateProperties();
  }