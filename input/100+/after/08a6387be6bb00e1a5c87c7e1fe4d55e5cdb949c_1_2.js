function(config) {
	//"id": entry.object.id, // short cut for "id" item field
	this.timestamp = Echo.Utils.timestampFromW3CDTF(this.data.object.published);
}