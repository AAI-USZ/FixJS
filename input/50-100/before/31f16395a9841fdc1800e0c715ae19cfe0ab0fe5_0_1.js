function() {

  		quailTest.runTest( 'documentAllColorsAreSet', '252-1.html');
  		equal(true, quailTest.confirmIsTag('html'), 'Document is set');

  		quailTest.runTest( 'documentAllColorsAreSet', '252-2.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');

  		quailTest.runTest( 'documentAllColorsAreSet', '252-3.html');
  		equal(true, quailTest.confirmIsEmpty(), 'Results are empty');
    }