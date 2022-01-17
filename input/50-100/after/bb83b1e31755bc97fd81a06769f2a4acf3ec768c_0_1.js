function createTokenId() {
	var len = 5,
		key = createKey(),
		offset = parseInt(Math.random() * (key.length - len));
	//return 1;
	return key.substring(offset, offset + len);
}