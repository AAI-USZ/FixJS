function() {

	var jba = JBA.create();

	

	ok(!jba.isUnsignedIntValid(4294967296), "testing 4294967296");

	ok(!jba.isUnsignedIntValid(-1), "testing -1");	

	ok(jba.isUnsignedIntValid(0), "testing 0");

	ok(jba.isUnsignedIntValid(4294967295), "testing 4294967295");	

}