function(name) {
	var $elems = this, e,
		layers, l;
	
	for (e=0; e<$elems.length; e+=1) {
		// Get layers array for each element
		layers = $($elems[e]).getLayers();
	
		// Loop through layers array for each element
		for(l = layers.length -1; l > 0; l--) {
			// Remove layer if group name matches
			if (layers[l].group === name) {
				layers.splice(l, 1);
			}
		}
	
	}
	return $elems;
}