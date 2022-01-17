function(id, props) {
	var $elems = this, e,
		layers, l;
	for (e=0; e<$elems.length; e+=1) {
		layers = $($elems[e]).getLayers();
		
		if (typeof id === 'string') {
			for (l=0; l<layers.length; l+=1) {
				if (layers[l].name === id) {
					id = l;
				}
			}
		}
		id = id || 0;
		// Merge properties with layer
		merge(layers[id], props);
		
	}
	return $elems;
}