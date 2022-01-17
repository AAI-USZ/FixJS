function(element) {
	var component = this.component;
	//TODO: get published from item's config
	//var published = this.config.get("data.object.published");
	var published = "1994-11-05T08:15:30Z";
	var date = new Date(Echo.Utils.timestampFromW3CDTF(published) * 1000);
	return element.text(date.toLocaleDateString() + ', ' + date.toLocaleTimeString());
}