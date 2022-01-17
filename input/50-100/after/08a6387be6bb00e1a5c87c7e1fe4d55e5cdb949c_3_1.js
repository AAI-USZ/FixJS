function(element) {
	var component = this.component;
	var published = component.data.object.published;
	var date = new Date(Echo.Utils.timestampFromW3CDTF(published) * 1000);
	return element.text(date.toLocaleDateString() + ', ' + date.toLocaleTimeString());
}