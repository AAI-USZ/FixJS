function(element) {
	return element.append(this.data.actor.title || this.labels.get("guest"));
}