function $create(type, attributes) {
	var node;
	if(type == 'textNode') {
		node = document.createTextNode(attributes);
	} else {
		node = document.createElement(type);
		if(typeof attributes == 'string') {
			node.textContent = attributes;
		} else {
			for (var attr in attributes){
				if(attr == "textContent") {
					node.textContent = attributes[attr];
				} else if (attr == "className") {
					node.className = attributes[attr];
				} else if (attr == "innerHTML") {
					node.innerHTML = attributes[attr];
				} else if (attributes.hasOwnProperty(attr)) {
					node.setAttribute(attr, html_entity_decode(attributes[attr]));
				}
			}
		}
	}
	return node;
}