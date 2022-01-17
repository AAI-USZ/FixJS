function(className, param, onCreatedFn) {

		//workaround to prevent the constructor be called infinitely..
		if (!param.constructor) param[constructor] = {};

		return XM.ClassManager.create(className, param, function() {
			var cls = XM.ClassManager.getReference(className);
			if (onCreatedFn) {
				onCreatedFn.call(cls);
			}
		});
	}