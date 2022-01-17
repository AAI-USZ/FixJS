function (node) {
			if (node.type === 'VariableDeclarator') { node = node.id; }
			
			var line   = node.loc.start.line;
			var column = node.loc.start.column;
			
			if (! cache.variables[line]) { cache.variables[line] = {}; }
			cache.variables[line][column] = node.name;
		}