function clean(ast) {
		if (ast instanceof Array) {
			if (ast.length == 1) { return clean(ast[0]) }
			return map(filter(ast), clean)
		}
		return ast || []
	}