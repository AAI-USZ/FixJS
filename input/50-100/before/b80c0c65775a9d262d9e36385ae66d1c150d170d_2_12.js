function() {

	var jba;

	

	jba = new JBA();

	jba.writeShort(-32768);	

	ok(jba.size() === 2);



	jba = new JBA();

	jba.writeShort(32767);

	ok(jba.size() === 2);

}