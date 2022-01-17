function(context, options) {
	if (context >= options.hash.compare)
		return options.unless(this);
	return options.fn(this);
}