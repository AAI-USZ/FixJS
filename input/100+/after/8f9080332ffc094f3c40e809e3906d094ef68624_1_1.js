function() {
    strong.back.putAtPath('es.everything', 'I am a translated string for locale: es');
    strong.default_locale = 'de';
    strong.locale = 'en';
    expect(strong.translate('everything', { locale: [ 'pt', 'es' ] })).toEqual('I am a translated string for locale: es');
  }