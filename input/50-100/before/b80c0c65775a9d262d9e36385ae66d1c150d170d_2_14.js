function() {

	var jba;

	

	jba = new JBA();

	jba.writeInt(-2147483648);	

	ok(jba.size() === 4);



	jba = new JBA();

	jba.writeInt(2147483647);

	ok(jba.size() === 4);

}