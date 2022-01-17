function(typeNumber, errorCorrectLevel, dataList) {

	

	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);

	

	var buffer = new QRBitBuffer();

	

	for (var i = 0; i < dataList.length; i++) {

		var data = dataList[i];

		buffer.put(data.mode, 4);

		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );

		data.write(buffer);

	}



	// calc num max data.

	var totalDataCount = 0;

	for (var i = 0; i < rsBlocks.length; i++) {

		totalDataCount += rsBlocks[i].dataCount;

	}



	if (buffer.getLengthInBits() > totalDataCount * 8) {

		throw new Error("code length overflow. ("

			+ buffer.getLengthInBits()

			+ ">"

			+  totalDataCount * 8

			+ ")");

	}



	// end code

	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {

		buffer.put(0, 4);

	}



	// padding

	while (buffer.getLengthInBits() % 8 != 0) {

		buffer.putBit(false);

	}



	// padding

	while (true) {

		

		if (buffer.getLengthInBits() >= totalDataCount * 8) {

			break;

		}

		buffer.put(qrCodeGenerator.PAD0, 8);

		

		if (buffer.getLengthInBits() >= totalDataCount * 8) {

			break;

		}

		buffer.put(qrCodeGenerator.PAD1, 8);

	}



	return qrCodeGenerator.createBytes(buffer, rsBlocks);

}