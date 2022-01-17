function propex(properties, marker, isArray, min, max, source){
	var items = this.items = {};
	//properties
	this.min = min;
	this.max = max;
	this.isArray = isArray;
	this.marker = marker;
	this.length = properties.length;
	if(source) //this only happens at the top level
		this.source = source;

	if (properties) {
		properties.forEach(function(target){
			items[target.name.toLowerCase()] =  target;
		});
	}
	Object.freeze(this.items);
	Object.freeze(this);
}