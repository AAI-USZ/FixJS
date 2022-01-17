function(element) {
	var component = this.component;
	return element.text(component.data.actor.title || component.labels.get("guest"));
}