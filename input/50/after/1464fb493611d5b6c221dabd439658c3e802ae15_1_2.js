function() {
    strong.back.putAtPath('es-mx.everything', 'I am a translated string for locale: es-mx');
    strong.default_locale = 'de';
    strong.locale = 'es-MX';
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: es-mx');
  }