function createTokenId() {
	var key = createKey(),
		offset = parseInt(Math.random() * (key.length - 5));
	//return 1;
	return key.substring(offset, offset + 5);
}