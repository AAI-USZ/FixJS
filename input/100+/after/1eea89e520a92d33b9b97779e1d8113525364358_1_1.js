function (tokens, bucket, container) {
	var property = new Property(bucket, container);
	property.debug('parse', tokens);
	var thisToken = tokens.getToken();
	property.add(thisToken);
	var nextToken = tokens.nextToken();

	if (thisToken.type == 'CHAR' && thisToken.content == '*' && nextToken.type == 'IDENT') {
		property.add(nextToken);
		nextToken = tokens.nextToken();
	}

	if (nextToken && nextToken.type == 'S') {
		tokens.next();
	}
	
	return property;
}