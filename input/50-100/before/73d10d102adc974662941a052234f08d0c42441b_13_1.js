function (item, node, schemaAttributes) {
		if (attributeNodes.indexOf(item.node) >= 0) {
			return attributeEditorRow(item, node, schemaAttributes);
		} else if (nameNodes.indexOf(item.node) >=0) {
			return nameEditorRow(item, node);
		} else {
			return textValueEditorRow(item, node);
		}
	}