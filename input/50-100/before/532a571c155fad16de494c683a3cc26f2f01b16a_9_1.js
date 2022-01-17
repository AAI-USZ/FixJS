function skipWhitespaceNodes(e, next) {

		while (e && (e.nodeType === 8 || (e.nodeType === 3 && /^[ \t\n\r]*$/.test(e.nodeValue)))) {

			e = next(e);

		}

		return e;

	}