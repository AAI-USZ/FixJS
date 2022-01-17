function() {

	var jba;

	

	jba = new JBA();

	jba.writeUnsignedByte(0);	

	ok(jba.size() === 1);



	jba = new JBA();

	jba.writeUnsignedByte(255);

	ok(jba.size() === 1);

}