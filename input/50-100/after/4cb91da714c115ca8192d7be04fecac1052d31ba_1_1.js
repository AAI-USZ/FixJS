function (node) {
			if (node.type === 'ThisExpression') { node.name = "this"; }
			else if (node.type === 'VariableDeclarator') { node = node.id; }
			
			var line   = node.loc.start.line;
			var column = node.loc.start.column;
			
			if (! cache.variables[line]) { cache.variables[line] = {}; }
			cache.variables[line][column] = node.name;
		}