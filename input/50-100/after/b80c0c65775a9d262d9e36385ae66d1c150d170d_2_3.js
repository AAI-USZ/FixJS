function() {

	var jba = JBA.create();

	

	ok(!jba.isUnsignedByteValid(256), "testing 256");

	ok(!jba.isUnsignedByteValid(-1), "testing -1");	

	ok(jba.isUnsignedByteValid(0), "testing 0");

	ok(jba.isUnsignedByteValid(255), "testing 255");	

}