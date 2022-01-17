function() {

	var jba = new JBA();

	

	ok(!jba.isUnsignedShortValid(65536), "testing 65536");

	ok(!jba.isUnsignedShortValid(-1), "testing -1");	

	ok(jba.isUnsignedShortValid(0), "testing 0");

	ok(jba.isUnsignedShortValid(65535), "testing 65535");	

}