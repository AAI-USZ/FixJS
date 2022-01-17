function() {

	var jba;

	

	jba = new JBA();

	jba.writeByte(-128);	

	ok(jba.size() === 1);



	jba = new JBA();

	jba.writeByte(127);

	ok(jba.size() === 1);

}