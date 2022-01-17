function() {

	var jba = new JBA();

	

	ok(!jba.isShortValid(32768), "testing 32768");

	ok(!jba.isShortValid(-32769), "testing -32769");	

	ok(jba.isShortValid(-32768), "testing -32768");

	ok(jba.isShortValid(32767), "testing 32767");

	ok(jba.isShortValid(0), "testing 0");	

}