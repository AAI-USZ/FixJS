function getLogMessagePrefix(kind, moduleName) {
	if (kind.fn === util.log) {
		// special-case for util.log - it outputs a nice date for us
		return kind.prefix + ' (' + moduleName + '): ';
	}
	else {
		return new Date().toJSON() + ' ' + kind.prefix + ' (' + moduleName + '): ';
	}
}