function(inString) {
			var indent = 0;
			var lines = inString.split(/\r?\n/);
			for (var i=0, l; (l=lines[i]) != null; i++) {
				if (l.length > 0) {
					indent = l.search(/\S/);
					if (indent < 0) {
						indent = l.length;
					}
					break;
				}
			}
			if (indent) {
				for (var i=0, l; (l=lines[i]) != null; i++) {
					lines[i] = l.slice(indent);
				}
			}
			return lines.join("\n");
		}