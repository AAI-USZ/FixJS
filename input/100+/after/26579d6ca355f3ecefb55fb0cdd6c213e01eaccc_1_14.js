function(element, opacity){
	var style = element.style;
	if (!element.currentStyle || !element.currentStyle.hasLayout) style.zoom = 1;
	if (opacity == null || opacity == 1) opacity = '';
	else opacity = 'alpha(opacity=' + (opacity * 100).limit(0, 100).round() + ')';
	var filter = style.filter || element.getComputedStyle('filter') || '';
	style.filter = reAlpha.test(filter) ? filter.replace(reAlpha, opacity) : filter + opacity;
	if (!style.filter) style.removeAttribute('filter');
}