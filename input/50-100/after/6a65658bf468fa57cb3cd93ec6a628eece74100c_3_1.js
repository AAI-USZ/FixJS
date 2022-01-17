function getLogMessagePrefix(kind, moduleName) {
	var afterTimestamp = kind.prefix + ' (' + moduleName + '): ';

	if (kind.fn === util.log) {
		// special-case for util.log - it outputs a nice date for us
		return afterTimestamp;
	}
	else {
		return '' + new Date().toJSON() + ' ' + afterTimestamp;
	}
}