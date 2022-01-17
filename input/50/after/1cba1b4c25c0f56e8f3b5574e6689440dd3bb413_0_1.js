function (def) {
		duckPunchRequire(def.require);
		return origExecuteDefFunc(def);
	}