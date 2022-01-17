function generateDetails(file){
		var fd = fs.openSync(file, 'w', parseInt('0644', 8));

		// “version” attribute is new vs. old php parser
		// TODO: Calling fs.writeSync(fd) feels wrong. Is there no fd.writeSync?
		fs.writeSync(fd, '<javascript version="1">', null);

		/**
		 * Parses a code module, or a class within a module, into an XmlNode.
		 */
		function parseObject(value, id, pulledIn){
			var moduleNode = new XmlNode('object', { location: id }),
				propertiesNode = moduleNode.createNode('properties'),
				methodsNode = moduleNode.createNode('methods');

			if (value.type) {
				moduleNode.attributes.type = value.type;
			}

			// Once upon a time, the parser was an instance of an anonymous function;
			// this pattern might be reproduced elsewhere, so it is handled here
			if (value.type === Value.TYPE_INSTANCE && !value.value.relatedModule) {
				value = value.value;
			}

			if (value.metadata.classlike) {
				moduleNode.attributes.classlike = 'true';

				if (value.mixins.length) {
					moduleNode.attributes.superclass = value.mixins[0].id;

					var mixinsNode = moduleNode.createNode('mixins'),
						mixin;
					for (var i = 0; (mixin = value.mixins[i]); ++i) {
						mixinsNode.createNode('mixin', { location: mixin.id });
					}
				}

				var prototype = value;
				while ((prototype = prototype.getProperty('prototype')) && prototype.type !== Value.TYPE_UNDEFINED) {
					if (prototype.getProperty('constructor')) {
						processFunction(moduleNode, prototype.getProperty('constructor'));
						break;
					}
				}
			}
			else if (value.type in Value.METHOD_TYPES) {
				processFunction(moduleNode, value);
			}

			mixinMetadata(moduleNode, value.metadata);

			// dojo/_base/declare’d objects using dojodoc end up with their standard metadata on the prototype object
			// instead of on the value itself
			if (value.metadata.classlike) {
				mixinMetadata(moduleNode, value.getProperty('prototype').metadata);
			}

			readProperties('normal', propertiesNode, methodsNode, value.properties, pulledIn);

			return moduleNode;
		}

		var parsedModules = Module.getAll();

		for (var k in parsedModules) {
			if (parsedModules.hasOwnProperty(k)) {
				console.status('Exporting', k);

				var module = parsedModules[k];
				var pulledIn = computedPulledIn(k, parsedModules);

				fs.writeSync(fd, parseObject(module.value, module.id, pulledIn).toString(), null);

				// If the module contains nested classes (ex: dijit/Tree.TreeNode) or objects,
				// output them as though they were separate modules
				var properties = module.value.properties;
				for(var c in properties){
					if (_hasOwnProperty.call(properties, c)) {
						var property = properties[c];
						if (property.type === "constructor") {
							fs.writeSync(fd, parseObject(property, k + "." + c, pulledIn).toString(), null);
							property._separatePage = true;
						}
					}
				}
			}
		}

		fs.writeSync(fd, '</javascript>', null);
		fs.closeSync(fd);

		console.status('Output written to', file);
	}