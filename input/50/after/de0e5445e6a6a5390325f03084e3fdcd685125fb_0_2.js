function(context, options) {
	if (context > options.hash.compare)
		return options.inverse(this);
	return options.fn(this);
}