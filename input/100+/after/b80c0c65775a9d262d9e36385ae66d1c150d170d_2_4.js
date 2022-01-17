function() {

	var jba, value;

	

	jba = JBA.create();

	jba.writeUnsignedByte(0);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 0, "writing / reading 0");

	

	jba = JBA.create();

	jba.writeUnsignedByte(255);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 255, "writing / reading 255");

	

	jba = JBA.create();

	jba.writeUnsignedByte(121);

	jba.position = 0;

	value = jba.readUnsignedByte();

	ok(value === 121, "writing / reading 121");	

}