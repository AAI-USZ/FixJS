function() {

	var jba;

	

	jba = JBA.create();

	jba.writeInt(-2147483648);	

	ok(jba.size() === 4);



	jba = JBA.create();

	jba.writeInt(2147483647);

	ok(jba.size() === 4);

}