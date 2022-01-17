function() {
    strong.back.putAtPath('en.everything', 'I am a translated string for locale: en');
    strong.default_locale = 'de';
    strong.locale = ['es', 'en'];
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: en');
  }