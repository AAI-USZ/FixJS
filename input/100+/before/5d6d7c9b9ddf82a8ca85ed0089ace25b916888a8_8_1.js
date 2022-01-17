function(Deferred, FileServiceImpl) {
	function trace(implementation) {
		var method;
		var traced = {};
		for (method in implementation) {
			if (typeof implementation[method] === 'function') {
				traced[method] = function(methodName) {
					return function() {
						console.log(methodName);
						var arg;
						for (arg in arguments) {
							console.log(" [" + arg + "] " + arguments[arg]);
						}
						var result = implementation[methodName].apply(implementation, Array.prototype.slice.call(arguments));
						Deferred.when(result, function(json) {
							console.log(json);
						});
						return result;
					};
				}(method);
			}
		}
		return traced;
	}

	function makeParentRelative(location) {
		try {
			if (window.location.host === parent.location.host && window.location.protocol === parent.location.protocol) {
				return location.substring(parent.location.href.indexOf(parent.location.host) + parent.location.host.length);
			}
		} catch (e) {
			//skip
		}
		return location;
	}

	var provider = new eclipse.PluginProvider();

	var temp = document.createElement('a');
	temp.href = "../file";
	// note global
	var fileBase = makeParentRelative(temp.href);

	temp.href = "../workspace";
	// note global
	var workspaceBase = makeParentRelative(temp.href);

	temp.href = "..";
	var patternBase = makeParentRelative(temp.href);




	var service = new FileServiceImpl(fileBase, workspaceBase);
	//provider.registerServiceProvider("orion.core.file", trace(service), {Name:'Orion Content', top:fileBase, pattern:patternBase});
	provider.registerServiceProvider("orion.core.file", service, {
		Name: 'Orion Content',
		top: fileBase,
		pattern: patternBase
	});
	service.dispatchEvent = provider.dispatchEvent;
	provider.connect();
}