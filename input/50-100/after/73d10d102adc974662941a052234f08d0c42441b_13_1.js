function (item, node, schemaAttributes) {
		var row;
		if (attributeNodes.indexOf(item.node) >= 0) {
			return attributeEditorRow(item, node, schemaAttributes);
		} else if (nameNodes.indexOf(item.node) >=0) {
			return nameEditorRow(item, node);
		} else {
			row = textValueEditorRow(item, node);
			row.find("input").css({width:"400px"});
			return row;
		}
	}