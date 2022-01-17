function(id) {
	var $elems = this, e,
		layers, i;
	
	for (e=0; e<$elems.length; e+=1) {
		layers = $($elems[e]).getLayers();
		// Search layers array if layer name is given
		if (typeof id === 'string') {
		
			// Search layers array to find a matching name
			for (i=0; i<layers.length; i+=1) {
				// Check to see if name matches
				if (layers[i].name === id) {
					id = i;
					break;
				}
			}
			
		}
		// Remove layer from the layers array
		layers.splice(id, 1);
	}
	return $elems;
}