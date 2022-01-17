function() {

	var jba, value;

	

	jba = JBA.create();

	jba.writeByte(0);

	jba.position = 0;

	value = jba.readByte();

	ok(value === 0, "writing / reading 0");

	

	jba = JBA.create();

	jba.writeByte(-128);

	jba.position = 0;

	value = jba.readByte();

	ok(value === -128, "writing / reading -128");

	

	jba = JBA.create();

	jba.writeByte(127);

	jba.position = 0;

	value = jba.readByte();

	ok(value === 127, "writing / reading 127");

	

	

	jba = JBA.create();

	jba.writeByte(118);

	jba.position = 0;

	value = jba.readByte();

	ok(value === 118, "writing / reading 118");	

	

	jba.position = 0;

	jba.writeByte(-103);

	jba.position = 0;

	value = jba.readByte();	

	ok(value === -103, "writing / ready -103");

	

}