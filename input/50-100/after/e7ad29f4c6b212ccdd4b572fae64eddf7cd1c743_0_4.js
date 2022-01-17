function(Class, alias){
	XM.apply(XM, {

		"new": alias(XM.ClassManager, "createInstance"),

		define: function(className, param, onCreatedFn) {

			//workaround to prevent the constructor be called infinitely..
			//if (!param.constructor) param[constructor] = {};

			XM.ClassManager.create.apply(XM.ClassManager, arguments);
			/*
			return XM.ClassManager.create(className, param, function() {
				var cls = XM.ClassManager.getReference(className);
				if (onCreatedFn) {
					onCreatedFn.call(cls);
				}
			});
			*/
		}
	});
}