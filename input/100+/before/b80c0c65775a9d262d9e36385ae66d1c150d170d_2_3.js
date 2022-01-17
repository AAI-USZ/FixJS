function() {

	var jba, value;

	

	jba = new JBA();

	jba.writeASCIIString("javascript");

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "javascript", "writing / reading javascript");



	jba = new JBA();

	jba.writeASCIIString("javascript", 200);

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "javascript", "writing / reading javascript with bigger buffer");



	jba = new JBA();

	jba.writeASCIIString("javascript", 4);

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "java", "writing / reading javascript with lower buffer");

	

	jba = new JBA();

	jba.writeASCIIString("java" + "\0" + "script");

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "java", "writing / reading javascript with null char");	

}