function() {

	var jba = JBA.create();

	

	ok(jba.isASCIICharValid("a"), "testing a");

	ok(jba.isASCIICharValid("9"), "testing 9");	

	ok(!jba.isASCIICharValid("é"), "testing é");

	ok(!jba.isASCIICharValid("þ"), "testing þ");

}