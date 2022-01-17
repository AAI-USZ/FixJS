function (name, version, values) {

		if (typeof(name) === 'string' && typeof(version) === 'object' && !values) {
			values = version;
			version = undefined;
		} else if (typeof(name) !== 'string' && typeof(version) !== 'number') {
			if (typeof(name) === 'object' && name.name && name.version) {
				version = name.version;
				name = name.name;
			}
		}

		return self.get(name, version).create(values);
	}