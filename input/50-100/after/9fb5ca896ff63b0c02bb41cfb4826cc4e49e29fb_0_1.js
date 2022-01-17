function(id, props) {
	var $elems = this, e,
		layer;
	if (!id) {
		props = id;
		id = 0;
	}
	for (e=0; e<$elems.length; e+=1) {
		layer = $($elems[e]).getLayer(id);
		// Merge properties with layer
		merge(layer, props);
		
	}
	return $elems;
}