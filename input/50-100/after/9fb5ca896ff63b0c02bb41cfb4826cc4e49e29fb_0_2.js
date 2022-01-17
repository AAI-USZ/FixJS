function(name) {
	var layers = this.getLayers(),
		group = [], l;
	
	for (l=0; l<layers.length; l+=1) {
		// Include layer if apart of group
		if (layers[l].group === name) {
			group.push(layers[l]);
		}
	}
	return group;
}