function(element) {
	return (this.user.any("roles", ["administrator", "moderator"])) ? element.show() : element.hide();
}