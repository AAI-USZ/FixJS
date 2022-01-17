function() {

	var jba = JBA.create();

	

	ok(!jba.isByteValid(128), "testing 128");

	ok(!jba.isByteValid(-129), "testing -129");	

	ok(jba.isByteValid(-127), "testing -127");

	ok(jba.isByteValid(127), "testing 127");

	ok(jba.isByteValid(0), "testing 0");	

}