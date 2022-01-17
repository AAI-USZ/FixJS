function makeLogKind(prefix, fn) {
	if (prefix !== 'ERROR' && prefix !== 'INFO') {
		throw new Error('the prefix must be ERROR or INFO');
	}

	return {prefix: prefix, prefixer: getLogMessagePrefix, fn: fn };
}