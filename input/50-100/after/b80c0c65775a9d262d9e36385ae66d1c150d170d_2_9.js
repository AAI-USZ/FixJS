function() {

	var jba;

	

	jba = JBA.create();

	jba.writeUnsignedByte(0);	

	ok(jba.size() === 1);



	jba = JBA.create();

	jba.writeUnsignedByte(255);

	ok(jba.size() === 1);

}