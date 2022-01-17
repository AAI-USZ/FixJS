function() {

	var jba;

	

	jba = JBA.create();

	jba.writeUnsignedShort(0);	

	ok(jba.size() === 2);



	jba = JBA.create();

	jba.writeUnsignedShort(65535);

	ok(jba.size() === 2);

}