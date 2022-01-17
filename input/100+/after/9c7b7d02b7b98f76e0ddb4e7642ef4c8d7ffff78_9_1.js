function getOption(opts, name) {

	return typeof(opts[name]) == "undefined" ? "" : opts[name];

}