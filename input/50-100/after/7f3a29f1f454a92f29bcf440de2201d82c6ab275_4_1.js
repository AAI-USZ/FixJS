function (jsonData, comment /* optional */, fullClosingTags /* optional */) {
			var cslXml = '<?xml version="1.0" encoding="utf-8"?>\n',
				lines,
				lineIndex;
			
			cslXml += xmlNodeFromJson(jsonData, 0, fullClosingTags);

			if (typeof(comment) === "string") {
				lines = cslXml.split("\n");

				// comment needs to go on line no. 3, after the style node
				lines.splice(2,0,"<!-- " + comment + " -->");

				cslXml = lines.join("\n");
			}
			
			return cslXml;
		}