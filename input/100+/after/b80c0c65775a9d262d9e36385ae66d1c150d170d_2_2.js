function() {

	var jba, value;

	

	jba = JBA.create();

	jba.writeASCIIChar("a");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "a", "writing / reading a");





	jba = JBA.create();

	jba.writeASCIIChar("\n");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "\n", "writing / reading \n");

	

	jba = JBA.create();

	jba.writeASCIIChar("\0");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "\0", "writing / reading \0");

}