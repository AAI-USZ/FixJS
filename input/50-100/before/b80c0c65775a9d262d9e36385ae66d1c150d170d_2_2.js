function() {

	var jba = new JBA();

	

	ok(jba.isASCIIStringValid("hello word"), "testing hello word");

	ok(jba.isASCIIStringValid("foo" + "\0" + "bar"), "testing foo[null char]bar");	

	ok(!jba.isASCIIStringValid("déjà"), "testing déjà");	

	ok(!jba.isASCIIStringValid("Россия"), "testing Россия");

}