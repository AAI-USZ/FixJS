function clean(ast) {
		if (ast instanceof Array) {
			if (ast.length == 1) { return clean(ast[0]) }
			return map(pick(ast), clean)
		}
		return ast || []
	}