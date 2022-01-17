function(config) {
	this.children = [];
	this.depth = 0;
	this.threading = false;
	//"id": entry.object.id, // short cut for "id" item field
	this.timestamp = Echo.Utils.timestampFromW3CDTF(this.data.object.published);
	this.textExpanded = false;
	this.blocked = false;
	this.buttonsOrder = [];
	this.buttonSpecs = {};
	this.buttons = {}; 
}