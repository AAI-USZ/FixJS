function(element, opacity){
	element.store('$opacity', opacity);
	element.style.visibility = opacity > 0 ? 'visible' : 'hidden';
}