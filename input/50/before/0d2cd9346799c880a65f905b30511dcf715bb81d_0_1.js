function (i, attributeIndex) {
					if (isValidValue(nodeData.attributes[attributeIndex].value, schemaAttribute)) {
						thisAttribute = nodeData.attributes[attributeIndex];
						return false;
					}
				}