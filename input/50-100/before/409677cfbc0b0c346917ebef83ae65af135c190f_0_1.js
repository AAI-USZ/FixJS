function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			el.removeAttributeNode(attr);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	}