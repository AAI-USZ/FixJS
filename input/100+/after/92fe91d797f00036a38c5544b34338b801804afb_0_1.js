function(moduleName, forceOverride, extensions) {
	if (forceOverride && !extensions) {
		extensions = forceOverride;
		forceOverride = false;
	}

	if (!this.modules[moduleName]) {
		throw new Error("Module " + moduleName + " has not been included. Cannot extend this module.");
	}

	var module = this.modules[moduleName];

	if (extensions.prototype) {
		this.extendModulePrototype(module, extensions.prototype, forceOverride);
	}

	if (extensions.callbacks) {
		this.extendModuleCallbacks(module, extensions.callbacks);
	}

	module = null;
}