function parseDocument(doc) {
		if (! doc || doc.extension !== 'js') { return; }

		removeFunctionTracepoints(doc.url);

		// Loc: store locations as node.loc.(start|end).(line|column)
		var tree  = Parser.parse(doc.getText(), { loc: true });
		var cache = Parser.getCacheForUrl(doc.url);
		
		cache.functions = [];
		var onFunction = function (node) {
			cache.functions.push(node);
			addFunctionTracepoints(doc.url, node);
		};

		cache.variables = {};
		var onVariable = function (node) {
			if (node.type === 'VariableDeclarator') { node = node.id; }
			
			var line   = node.loc.start.line;
			var column = node.loc.start.column;
			
			if (! cache.variables[line]) { cache.variables[line] = {}; }
			cache.variables[line][column] = node.name;
		};

		var handlers = {
			FunctionDeclaration: onFunction,
			FunctionExpression:  onFunction,
			Identifier:          onVariable,
			VariableDeclarator:  onVariable
		};
		
		Parser.walk(tree, handlers);
	}