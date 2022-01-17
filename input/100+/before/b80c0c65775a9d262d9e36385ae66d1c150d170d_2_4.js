function() {

	var jba, value;

	

	jba = new JBA();

	jba.writeUnsignedByte(0);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 0, "writing / reading 0");

	

	jba = new JBA();

	jba.writeUnsignedByte(255);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 255, "writing / reading 255");

	

	jba = new JBA();

	jba.writeUnsignedByte(121);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 121, "writing / reading 121");	

}