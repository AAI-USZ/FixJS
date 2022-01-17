function(element) {
	var container = element || this.dom && this.dom.get("date");
	this.calcAge();
	if (container) {
		container.html(this.age);
	}
}