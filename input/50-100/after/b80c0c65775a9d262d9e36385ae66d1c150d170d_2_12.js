function() {

	var jba;

	

	jba = JBA.create();

	jba.writeShort(-32768);	

	ok(jba.size() === 2);



	jba = JBA.create();

	jba.writeShort(32767);

	ok(jba.size() === 2);

}