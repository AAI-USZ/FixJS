function (node) {
			var thisNodeProperties = new NodeProperties(),
				attributeName = node.attributes.item("name").nodeValue,
				defaultValue = node.attributes.getNamedItem("a:defaultValue"),
				values;

			lastAttributeValue = null;

			values = parseChildren(node);

			if (values.textNode) {
				// Will accept any free-form text
				thisNodeProperties.attributes[attributeName] = {
					values : [],
					refs : [],
					list : values.list,
					documentation : values.documentation
				};
			} else {
				thisNodeProperties.attributes[attributeName] = {
					values : values.attributeValues,
					refs : values.refs,
					list : values.list,
					documentation : values.documentation
				};
				if (values.attributeValues.length > 0 &&
						(values.attributeValues[0].type === "value" ||
						 (values.attributeValues[0].type === "data" &&
						  values.attributeValues[0].value === "integer")
						) &&
						schemaOptions && 'defaultDefaultAttribute' in schemaOptions) {
					// add an empty string if no default value is present
					if (defaultValue === null) {
						defaultValue = {
							value: schemaOptions.defaultDefaultAttribute.value
						};
					
						if (thisNodeProperties.attributes[attributeName].values.length > 0) {
							thisNodeProperties.attributes[attributeName].values.splice(
									0,0,schemaOptions.defaultDefaultAttribute);
						}
					}
				}
			}

			if (defaultValue !== null) {
				thisNodeProperties.attributes[attributeName].defaultValue = defaultValue.value;
			}

			return thisNodeProperties;
		}