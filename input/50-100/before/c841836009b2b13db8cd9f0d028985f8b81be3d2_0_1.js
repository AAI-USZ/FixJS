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

			return object;
		}