function(){

  equals(true, Modernizr.testProp('margin'), 'Everyone supports margin');

  equals(false, Modernizr.testProp('happiness'), 'Nobody supports the happiness style. :(');
  equals(true, Modernizr.testProp('fontSize'), 'Everyone supports fontSize');
  equals(false, Modernizr.testProp('font-size'), 'Nobody supports font-size');

  equals('pointerEvents' in  document.createElement('div').style,
         Modernizr.testProp('pointerEvents'),
         'results for `pointer-events` are consistent with a homegrown feature test');

}