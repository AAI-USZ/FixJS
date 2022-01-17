function() {

	var jba;

	

	jba = JBA.create();

	jba.writeUnsignedInt(0);	

	ok(jba.size() === 4);



	jba = JBA.create();

	jba.writeUnsignedInt(4294967295);

	ok(jba.size() === 4);

}