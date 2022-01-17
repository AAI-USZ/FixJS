function (jsonData, indent, fullClosingTags) {
		var attributesString = "",
			xmlString,
			index,
			innerString;

		if (jsonData.attributes.length > 0) {
		  	for (index = 0; index < jsonData.attributes.length; index++) {
				if (jsonData.attributes[index].enabled) {
					// TODO: the key probably shouldn't have characters needing escaping anyway,
					//       should not allow to input them in the first place
					attributesString += " " + 
						htmlEscape(jsonData.attributes[index].key) + '="' + 
						htmlEscape(jsonData.attributes[index].value) + '"';
				}
			}
		}
		xmlString = generateIndent(indent);

		if (typeof jsonData.textValue !== "undefined") {
			xmlString += "<" + jsonData.name + attributesString + ">";
			xmlString += htmlEscape(jsonData.textValue) + "</" + htmlEscape(jsonData.name) + ">\n";
		} else {
			xmlString += "<" + jsonData.name + attributesString;
			innerString = "";
			if (typeof jsonData.children !== "undefined" && jsonData.children.length > 0) {
				for (index = 0; index < jsonData.children.length; index++) {
					innerString += xmlNodeFromJson(jsonData.children[index], indent + 1, fullClosingTags);
				}
			}
			if (innerString !== "") {
				xmlString += ">\n" + innerString + generateIndent(indent) + "</" + htmlEscape(jsonData.name) + ">\n";
			} else if (fullClosingTags) {
				xmlString += "></" + jsonData.name + ">\n";
			} else {
				xmlString += "/>\n";
			}
		}

		return xmlString;
	}