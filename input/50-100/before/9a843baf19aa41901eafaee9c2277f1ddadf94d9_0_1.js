function(key, defaults, askParent) {
			var value = component.config.get(
				normalize(key),
				plugin.manifest.config[key]
			);
			return typeof value == undefined
				? askParent
					? component.config.get(key, defaults)
					: defaults
				: value;
		}