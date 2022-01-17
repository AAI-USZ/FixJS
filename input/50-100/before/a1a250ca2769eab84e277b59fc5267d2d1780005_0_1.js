function(name) {
	var $elems = this, e,
		layers, l;
	
	for (e=0; e<$elems.length; e+=1) {
		// Get layers array for each element
		layers = $($elems[e]).getLayers();
	
		// Loop through layers array for each element
		for (l=0; l<layers.length; l+=1) {
			// Remove layer if group name matches
			if (layers[l].group === name) {
				layers.splice(l, 1);
			}
		}
	
	}
	return $elems;
}