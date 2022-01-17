function() {

	var jba;

	

	jba = new JBA();

	jba.writeUnsignedShort(0);	

	ok(jba.size() === 2);



	jba = new JBA();

	jba.writeUnsignedShort(65535);

	ok(jba.size() === 2);

}