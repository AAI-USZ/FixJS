function(item, context, arg) {
		if (item.run) {
			item.run();
		} else if (item.action) {
			item.action.run(context);
		} else if (item.method && context && context[item.method] instanceof Function) {
			context[item.method](arg);
		} else if (item.commandID) {
			Runtime.executeCommand(item.commandID);
		}
	}