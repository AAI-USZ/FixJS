function (context, error) {
	try {
		if (context.callback)
			context.callback(error);
	}
	catch (e) {
		// empty
	}
}