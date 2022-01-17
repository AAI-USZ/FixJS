function(dom) {
	var newDom = document.createElement("span");
	var children = dom.children;
	var line, column, id;
	for (var i = 0; i < children.length; i++) {
	    if (children[i]['className'] === 'location-id') {
		id = children[i].textContent;
	    }
	    if (children[i]['className'] === 'location-offset') {
		// ignore for now
	    }
	    if (children[i]['className'] === 'location-line') {
		line = children[i].textContent;
	    }
	    if (children[i]['className'] === 'location-column') {
		column = children[i].textContent;
	    }
	    if (children[i]['className'] === 'location-span') {
		// ignore for now
	    }
	}
        newDom.appendChild(document.createElement("br"));
	newDom.appendChild(document.createTextNode('at line: ' + line + ', column: ' + column + ', in ' + id));
	return newDom;
    }