function readProperties(/**string*/ scope, /**XmlNode*/ propertiesNode, /**XmlNode*/ methodsNode,
							/**Object*/ properties, /**Object*/ pulledIn) {
		var property,
			propertyNode;

		function makePropertyObject(name, value) {
			var object = {
				name: name,
				scope: scope,
				type: value.metadata.type || value.type || 'unknown',
				// “from” attribute is new vs. old php parser
				from: value.file.moduleId
			};

			if (value.metadata.tags.indexOf('private') > -1) {
				object["private"] = "true";
			}

			if(!pulledIn[value.file.moduleId]){
				// App needs to manually require value.file.moduleId to use this property
				object["extension"] = "true";
			}

			return object;
		}

		for (var k in properties) {
			if (k === 'prototype' && _hasOwnProperty.call(properties, k)) {
				if (properties.prototype.properties === properties) {
					throw new Error('BUG: Infinite prototype loop!');
					continue;
				}

				readProperties('prototype', propertiesNode, methodsNode, properties[k].properties, pulledIn);
			}
			else if (_hasOwnProperty.call(properties, k)) {
				property = properties[k];

				// Filter out built-ins (Object.prototype, etc.)
				if (!property.file) {
					continue;
				}

				// TODO: special handling for constructors (type === "constructor"), which get their own <object> nodes
				// and hence their own pages
				if (property.type in Value.METHOD_TYPES) {
					propertyNode = methodsNode.createNode('method', makePropertyObject(k, property));
					processFunction(propertyNode, property);
				}
				else {
					propertyNode = propertiesNode.createNode('property', makePropertyObject(k, property));
				}

				mixinMetadata(propertyNode, property.metadata);
			}
		}
	}