function() {
    strong.back.putAtPath('zh.everything', 'I am a translated string for locale: zh');
    strong.default_locale = 'DE';
    // duplicate locale (en-us) should be ignored
    strong.locale = [ 'pt-PT', 'pt', 'en-US', 'en', 'es-ES', 'ES', 'en-gb', 'en-us', 'pt-br' ];
    expect(function(){ strong.translate('everything') }).toThrow("TranslationNotFound: Could not find key 'everything'.  Attempted: 'pt-pt.everything', 'pt.everything', 'en-us.everything', 'en.everything', 'es-es.everything', 'es.everything', 'en-gb.everything', 'pt-br.everything', 'de.everything'");
  }