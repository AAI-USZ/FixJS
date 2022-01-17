function(element) {
	var component = this.component;
	return element.text(this.config.get("data.actor.title") || component.labels.get("guest"));
}