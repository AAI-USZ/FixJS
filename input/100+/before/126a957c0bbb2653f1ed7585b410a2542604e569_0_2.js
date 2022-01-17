function (root) {
	if (!root) {
		console.log("Please specify a JML root element");
		return;
	}
	
	root.style.visibility = "hidden";
	
	var elem = undefined;
	var parent = root;
	var property = "";
	
	for (i = 0; i < this._tokens.length; ++i) {
		var token = this._tokens[i];
		
		if (token["TOKEN"] == "ELEMENT") {
			elem = document.createElement("div");
			elem.style.position = "absolute";
			elem.parent = parent;
			elem.type = token["DATA"];
                        
			this._addProperty(elem, "x", 0);
			this._addProperty(elem, "y", 0);
			this._addProperty(elem, "width", 0);
			this._addProperty(elem, "height", 0);
			this._addProperty(elem, "color", "");
			this._addProperty(elem, "source", "");
		}
		
		if (token["TOKEN"] == "SCOPE_START")
			parent = elem;
		
		if (token["TOKEN"] == "SCOPE_END") {
			parent = elem.parent;
			parent.appendChild(elem);
		}
		
		if (token["TOKEN"] == "PROPERTY")
			property = token["DATA"];
		
		if (token["TOKEN"] == "EXPRESSION") {
			if (!property)
				this._compileError("no property to assign value");
			else {
				// TODO make sure id is a proper one
				if (property == "id") 
					elem.id = token["DATA"];
				else {
					var value = "";
					
					try {
						value = eval(token["DATA"]);
					} catch (e) {
						this._compileError("error evaluating expression: " + token["DATA"], token["LINE"]);
					}
					
					elem[property] = value;
				}
				property = undefined;
			}
		}
	}
	
	root.style.visibility = "visible";
}