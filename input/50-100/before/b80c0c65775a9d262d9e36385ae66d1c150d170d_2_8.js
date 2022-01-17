function() {

	var jba = new JBA();

	

	ok(!jba.isIntValid(2147483648), "testing 2147483648");

	ok(!jba.isIntValid(-2147483649), "testing −2147483649");	

	ok(jba.isIntValid(-2147483648), "testing -2147483648");

	ok(jba.isIntValid(2147483647), "testing 2147483647");

	ok(jba.isIntValid(0), "testing 0");	

}