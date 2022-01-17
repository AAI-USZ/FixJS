function() {

	var jba, value;

	

	jba = JBA.create();

	jba.writeBool(false);

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading false");





	jba = JBA.create();

	jba.writeBool(true);

	jba.position = 0;

	value = jba.readBool();

	ok(value === true, "writing / reading true");

	



	jba = JBA.create();

	jba.writeBool("");

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading empty string");	

	

	jba = JBA.create();

	jba.writeBool("true");

	jba.position = 0;

	value = jba.readBool();

	ok(value === false, "writing / reading string");		

}