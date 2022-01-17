function(){
  var strong = require('../lib/strong');
  
  beforeEach(function () {
    strong.init();
  });

  it('should translate in the default locale', function() {
    strong.back.putAtPath('en.everything', 'I am a translated string for locale: en');
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: en');
  });

  it('should translate in the recently set default locale', function() {
    strong.back.putAtPath('de.everything', 'I am a translated string for locale: de');
    strong.default_locale = 'de';
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: de');
  });

  it('should translate in the current locale', function() {
    strong.back.putAtPath('en.everything', 'I am a translated string for locale: en');
    strong.default_locale = 'de';
    strong.locale = 'en';
    expect(strong.translate('everything')).toEqual('I am a translated string for locale: en');
  });

  it('should translate in the option-specified locale', function() {
    strong.back.putAtPath('es.everything', 'I am a translated string for locale: es');
    strong.default_locale = 'de';
    strong.locale = 'en';
    expect(strong.translate('everything', { locale: 'es' })).toEqual('I am a translated string for locale: es');
  });

  // Interpolation
  it('should use named arguments as substitutions', function() {
    strong.back.putAtPath('en.hello', 'Hello, %{name}');
    // Make sure you can toss variables at it
    var user = { name: 'Johnny' };
    expect(strong.translate( 'hello', user )).toEqual( 'Hello, Johnny' );
  });
  
  it('should navigate the object to fill substitution arguments', function() {
    strong.back.putAtPath('en.hello', 'Hello, %{name.first}');
    // Make sure you can use dot notation
    var user = { name: { first: 'Johnny', last: 'Smith' } };
    expect(strong.translate( 'hello', user )).toEqual( 'Hello, Johnny' );
  });

  // Pluralization
  it('should select an appropriate pluralization option', function() {
    strong.back.putAtPath('en.message_count', { one: '1 message', other: '%{count} messages' } );
  
    expect(strong.translate( 'message_count', { count: 0 } )).toEqual( '0 messages' );
    expect(strong.translate( 'message_count', { count: 1 } )).toEqual( '1 message' );
    expect(strong.translate( 'message_count', { count: 2 } )).toEqual( '2 messages' );
  });

  // Not found
  it('should raise a TranslationNotFound error when the key isn\'t found.', function() {
    strong.back.putAtPath('zh.everything', 'I am a translated string for locale: zh');
    expect(function(){ strong.translate('everything') }).toThrow("TranslationNotFound: Could not find key 'everything'.  Attempted: 'en.everything'");
  });


}