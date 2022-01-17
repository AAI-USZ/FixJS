function (i, attributeIndex) {
					if (nodeData.attributes[attributeIndex].enabled &&
						isValidValue(nodeData.attributes[attributeIndex].value, schemaAttribute)) {
						thisAttribute = nodeData.attributes[attributeIndex];
						return false;
					}
				}