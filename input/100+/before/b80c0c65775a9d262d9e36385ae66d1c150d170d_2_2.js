function() {

	var jba, value;

	

	jba = new JBA();

	jba.writeASCIIChar("a");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "a", "writing / reading a");





	jba = new JBA();

	jba.writeASCIIChar("\n");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "\n", "writing / reading \n");

	

	jba = new JBA();

	jba.writeASCIIChar("\0");

	jba.position = 0;

	value = jba.readASCIIChar();

	ok(value === "\0", "writing / reading \0");

}