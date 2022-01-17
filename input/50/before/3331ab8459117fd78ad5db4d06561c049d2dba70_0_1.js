function getLoggerForModule(moduleName) {
	return {
		error: function() { logWithKindPrefix(logKind.error, moduleName, arguments); },
		info: function() { logWithKindPrefix(logKind.info, moduleName, arguments); }
	};
}