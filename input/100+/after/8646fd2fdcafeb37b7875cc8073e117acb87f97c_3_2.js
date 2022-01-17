function(cache) {
	    //    cache.put(this, true);
	    var node = document.createElement("div");
	    var i;
	    node.appendChild(document.createTextNode("("));
	    node.appendChild(document.createTextNode(this._constructorName));
	    for(i = 0; i < this._fields.length; i++) {
		node.appendChild(document.createTextNode(" "));
		appendChild(node, toDomNode(this._fields[i], cache));
	    }
	    node.appendChild(document.createTextNode(")"));
	    return node;
	}