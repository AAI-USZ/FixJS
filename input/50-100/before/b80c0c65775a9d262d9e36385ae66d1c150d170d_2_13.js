function() {

	var jba;

	

	jba = new JBA();

	jba.writeUnsignedInt(0);	

	ok(jba.size() === 4);



	jba = new JBA();

	jba.writeUnsignedInt(4294967295);

	ok(jba.size() === 4);

}