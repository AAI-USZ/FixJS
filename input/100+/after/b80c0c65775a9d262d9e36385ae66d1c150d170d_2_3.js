function() {

	var jba, value;

	

	jba = JBA.create();

	jba.writeASCIIString("javascript");

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "javascript", "writing / reading javascript");



	jba = JBA.create();

	jba.writeASCIIString("javascript", 200);

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "javascript", "writing / reading javascript with bigger buffer");



	jba = JBA.create();

	jba.writeASCIIString("javascript", 4);

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "java", "writing / reading javascript with lower buffer");

	

	jba = JBA.create();

	jba.writeASCIIString("java" + "\0" + "script");

	jba.position = 0;

	value = jba.readASCIIString();

	ok(value === "java", "writing / reading javascript with null char");	

}