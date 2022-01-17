function(){

  equals(true, Modernizr.testAllProps('margin'), 'Everyone supports margin');

  equals(false, Modernizr.testAllProps('happiness'), 'Nobody supports the happiness style. :(');
  equals(true, Modernizr.testAllProps('fontSize'), 'Everyone supports fontSize');
  equals(false, Modernizr.testAllProps('font-size'), 'Nobody supports font-size');

  equals(Modernizr.csstransitions, Modernizr.testAllProps('transition'), 'Modernizr result matches API result: csstransitions');

  equals(Modernizr.csscolumns, Modernizr.testAllProps('columnCount'), 'Modernizr result matches API result: csscolumns')

}