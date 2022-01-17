function (def) {
		duckPunchRequire(def.ctx.require);
		return origExecuteDefFunc(def);
	}