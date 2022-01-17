function(inString) {
			var indent = 0;
			var lines = inString.split(/\r?\n/);
			var i, l;
			for (i=0; (l=lines[i]) != null; i++) {
				if (l.length > 0) {
					indent = l.search(/\S/);
					if (indent < 0) {
						indent = l.length;
					}
					break;
				}
			}
			if (indent) {
				for (i=0; (l=lines[i]) != null; i++) {
					lines[i] = l.slice(indent);
				}
			}
			return lines.join("\n");
		}