function() {
		var value = {properties: this.data.properties, children: []};

		if (this.orientationHRadioButton.get("checked")) {
			orientation = "H";
		} else {
			orientation = "V";
		}
		value.properties.orientation = orientation;

		delete value.properties.variablePane;

		if (value.properties.isTempID){
			delete value.properties.id; // delete temp id so it does not make it's way out to the source
		}

		var children = Query(".inputRow", this.rows);

		var idx = 0;
		dojo.forEach(children, function(child) {
			value.children.push(dijit.byNode(child).getValue());

			if (dijit.byNode(child).getUsingRemainingSpace()) {
				value.properties.variablePane = idx; 
			}

			idx++;
		});

		return value;
	}