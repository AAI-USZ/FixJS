function (jsonData, comment /* optional */, fullClosingTags /* optional */) {
			var cslXml = '<?xml version="1.0" encoding="utf-8"?>\n';
			
			if (typeof(comment) === "string") {
				cslXml += "<!-- " + comment + " -->\n";
			}
			
			cslXml += xmlNodeFromJson(jsonData, 0, fullClosingTags);
			return cslXml;
		}