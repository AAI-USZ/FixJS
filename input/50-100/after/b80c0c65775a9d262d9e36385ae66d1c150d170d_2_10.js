function() {

	var jba;

	

	jba = JBA.create();

	jba.writeByte(-128);	

	ok(jba.size() === 1);



	jba = JBA.create();

	jba.writeByte(127);

	ok(jba.size() === 1);

}