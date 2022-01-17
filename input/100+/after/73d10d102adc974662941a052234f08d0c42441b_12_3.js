function (attributeName, schemaAttribute) {
				var attributeIndexes = indexesOfAttribute(attributeName, nodeData.attributes),
					thisAttribute;
				
				$.each(attributeIndexes, function (i, attributeIndex) {
					if (nodeData.attributes[attributeIndex].enabled &&
						isValidValue(nodeData.attributes[attributeIndex].value, schemaAttribute)) {
						thisAttribute = nodeData.attributes[attributeIndex];
						return false;
					}
				});

				if (typeof thisAttribute !== "undefined" && thisAttribute.enabled) {
					possiblySelected = true;
				} else {
					definitelySelected = false;
				}
			}