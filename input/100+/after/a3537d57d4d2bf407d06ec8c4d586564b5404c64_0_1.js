function (mode, path) {
	var globalRules = [], cb, arg, value;
	path = resolve(String(path));
	if (isArray(mode)) {
		mode = String(mode.map(function (mode) {
			mode = String(mode);
			if (!modes[mode]) {
				throw new Error("Unknown mode '" + mode + "'");
			}
			if (modes[mode].globalRules) {
				push.apply(globalRules, modes[mode].globalRules);
			}
			return mode;
		}));
	} else if (mode) {
		if (!modes[mode]) {
			throw new Error("Unknown mode '" + mode + "'");
		} else if (modes[mode].globalRules) {
			push.apply(globalRules, modes[mode].globalRules);
		}
	}

	arg = arguments[2];
	if (arg) {
		if (isCallable(arg)) {
			cb = arg;
		} else {
			cb = arguments[3];
			arg = arg.globalRules;
			if (arg != null) {
				push.apply(globalRules, isArray(arg) ? arg : String(arg).split(eolRe));
			}
		}
	}

	if (globalRules.length) {
		value = applyGlobalRules(path,
			compact.call(globalRules.map(trim)).reverse());
		if (value) {
			return value;
		}
	}

	return mode ? isIgnored(path, mode).cb(cb) : deferred(false).cb(cb);
}