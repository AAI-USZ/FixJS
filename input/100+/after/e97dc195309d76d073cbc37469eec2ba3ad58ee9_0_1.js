function (name, version, values) {

		if (typeof(name) === 'string' && typeof(version) === 'object' && !values) {
			values = version;
			version = undefined;
		} else if (typeof(name) !== 'string' && typeof(version) !== 'number') {
			if (typeof(name) === 'object' && (name.type || name.name) && name.version) {
				values = name;
				version = name.version;
				name = name.type || name.name;
			}
		}

		return self.get(name, version).create(values);
	}