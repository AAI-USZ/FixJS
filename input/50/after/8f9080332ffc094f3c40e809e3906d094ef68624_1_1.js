function() {
    strong.back.putAtPath('de.everything', 'I am a translated string for locale: de');
    strong.default_locale = 'DE';
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: de');
  }