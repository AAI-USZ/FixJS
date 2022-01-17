function (request, response) {
	var self = this;

	if (!this.isLoaded_) {
		// If the route declaration is not loaded, respond with a 503
		log(colors.bold.RED + 'Routes were not loaded' + color.DEFAULT);
		response.end(503);
	} else {
		this.route_(request, response);
	}
}