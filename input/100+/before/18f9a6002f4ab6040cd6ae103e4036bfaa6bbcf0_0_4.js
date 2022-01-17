function() {
		var value = {type: "dojox.mobile.Pane", properties: {}};

		var style = "";
		var width = this.textBox.get("value");

		if (this.data && this.data.properties && this.data.properties.style) {
			var parse = CSSParser.parse(".foo{"+this.data.properties.style+"}");
	
			if (parse.model) {
				dojo.forEach(parse.model[0].children, dojo.hitch(this, function(prop) {
					if (prop.name == "width") {
						if (!this.useRemaingingSpace.get("checked")) {		
							if (width) {
								prop.value = width;
								style += prop.getText();
							} else {
							}
						}
					} else {
						style += prop.getText();
					}
				}));
			}
		} else {
			if (!this.useRemaingingSpace.get("checked") && width) {
				style = "width:"+width+";"
			}
		}

		if (style) {
			value.properties.style = style;
		}

		return value
	}