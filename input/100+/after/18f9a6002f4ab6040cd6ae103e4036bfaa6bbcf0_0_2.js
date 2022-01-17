function() {
		this._buildOrientation();

		if (this.data && this.data.properties) {
			var hasValue = false;

			// if we have style, get the width/height value
			if (this.data.properties.style) {
				var parse = CSSParser.parse(".foo{"+this.data.properties.style+"}");
	
				if (parse.model) {
					dojo.forEach(parse.model[0].children, dojo.hitch(this, function(prop) {
						if (prop.name == "width" && this.orientation == "H") {
							this.textBox.set("value", prop.value);
							hasValue = true;
						} else if (prop.name == "height" && this.orientation == "V") {
							this.textBox.set("value", prop.value);
							hasValue = true;
						}
					}));
				}
			}

			if (!hasValue) {
				this.useRemaingingSpace.set("checked", true);
			}
		}
	}