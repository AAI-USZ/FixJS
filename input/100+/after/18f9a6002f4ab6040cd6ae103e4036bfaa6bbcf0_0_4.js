function() {
		var value = {type: "dojox.mobile.Pane", properties: {}};

		var style = "";
		var textValue = this.textBox.get("value");

		if (this.data && this.data.properties && this.data.properties.style) {
			var parse = CSSParser.parse(".foo{"+this.data.properties.style+"}");
	
			var foundProp = false;

			if (parse.model) {
				dojo.forEach(parse.model[0].children, dojo.hitch(this, function(prop) {
					if (prop.name == "width") {
						if (this.orientation == "H") {
							if (!this.useRemaingingSpace.get("checked")) {		
								if (textValue) {
									prop.value = textValue;
									style += prop.getText();
									foundProp = true;
								}
							}
						}
					} else if (prop.name == "height") {
						if (this.orientation == "V") {
							if (!this.useRemaingingSpace.get("checked")) {		
								if (textValue) {
									prop.value = textValue;
									style += prop.getText();
									foundProp = true;
								}
							}
						}
					} else {
						style += prop.getText();
					}
				}));

				if (!this.useRemaingingSpace.get("checked") && textValue && !foundProp) {
					if (this.orientation == "H") {
						style += "width:"+textValue+";"
					} else {
						style += "height:"+textValue+";"
					}
				}
			}
		} else {
			if (!this.useRemaingingSpace.get("checked") && textValue) {
				if (this.orientation == "H") {
					style = "width:"+textValue+";"
				} else {
					style = "height:"+textValue+";"
				}
			}
		}

		if (style) {
			value.properties.style = style;
		}

		return value
	}