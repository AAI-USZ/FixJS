function (tokens, bucket, container) {
	var property = new Property(bucket, container);
	property.debug('parse', tokens);
	property.add(tokens.getToken());
	var nextToken = tokens.nextToken();

	if (nextToken && nextToken.type == 'S') {
		tokens.next();
	}
	
	return property;
}