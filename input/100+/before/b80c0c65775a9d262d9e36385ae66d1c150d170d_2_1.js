function() {

	var jba, value;

	

	jba = new JBA();

	jba.writeBool(false);

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading false");





	jba = new JBA();

	jba.writeBool(true);

	jba.position = 0;

	value = jba.readBool();

	ok(value === true, "writing / reading true");

	



	jba = new JBA();

	jba.writeBool("");

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading empty string");	

	

	jba = new JBA();

	jba.writeBool("true");

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading string");		

}