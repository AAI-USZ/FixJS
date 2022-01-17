function(element, opacity){
	if (!element.currentStyle || !element.currentStyle.hasLayout) element.style.zoom = 1;
	opacity = (opacity * 100).limit(0, 100).round();
	opacity = (opacity == 100) ? '' : 'alpha(opacity=' + opacity + ')';
	var filter = element.style.filter || element.getComputedStyle('filter') || '';
	element.style.filter = reAlpha.test(filter) ? filter.replace(reAlpha, opacity) : filter + opacity;
}