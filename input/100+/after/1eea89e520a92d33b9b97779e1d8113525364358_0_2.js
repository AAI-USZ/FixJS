function (tokens, bucket, container) {
		var declaration = new Declaration(bucket, container);
		declaration.debug('parse', tokens);

		declaration.property = bucket.property.parse(tokens, bucket, declaration);
		var nextToken = tokens.getToken();

		if (! nextToken || nextToken.type != "COLON") {
			bucket.parser.addError('colon-expected', nextToken);
			var invalidCss = bucket.invalid.parse(null, bucket, container);
			invalidCss.addList(declaration.property.list);
			invalidCss.consume(tokens);
			return invalidCss;
		}

		tokens.next();
		declaration.value = bucket.value.parse(tokens, bucket, declaration);

		// See if we can map properties to something we can validate
		var propertyName = declaration.property.getPropertyName().toLowerCase();

		// Remove the hack
		if (propertyName.substr(0, 1) == '*') {
			propertyName = propertyName.substr(1);
			bucket.parser.addWarning('hack:star', declaration.property.list[0]);
		} else if (propertyName.substr(0, 1) == '_') {
			propertyName = propertyName.substr(1);
			bucket.parser.addWarning('hack:underscore', declaration.property.list[0]);
		}

		if (! propertyMapping[propertyName]) {
			// Not a known property
			bucket.parser.addWarning('unknown-property:' + propertyName, declaration.property.list[0]);
			return declaration;
		}

		if (declaration.value.getLength() === 0) {
			bucket.parser.addWarning("require-value", declaration.property.list[0]);
			return declaration;
		}

		// Attempt to map the value
		valueBucket.setCssBucket(bucket);
		valueBucket.setDeclaration(declaration);
		var result = valueBucket['expression'].parse(declaration.value.getTokens(), valueBucket, declaration);

		if (! result) {
			// Value is not an expression - try the expected value
			result = propertyMapping[propertyName](declaration.value.getTokens(), valueBucket, declaration);
		}

		if (! result) {
			// Value did not match expected patterns
			var tokenForError = declaration.value.firstToken();

			if (! tokenForError) {
				tokenForError = declaration.property.list[0];
			}

			bucket.parser.addWarning("invalid-value", tokenForError);
			return declaration;
		}

		result.doWarnings();

		if (result.unparsed.length()) {
			bucket.parser.addWarning("extra-tokens-after-value", result.unparsed.firstToken());
		}

		declaration.value.setTokens([ result, result.unparsed ]);
		return declaration;
	}