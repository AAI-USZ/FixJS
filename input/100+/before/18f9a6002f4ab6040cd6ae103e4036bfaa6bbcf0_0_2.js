function() {
		this._buildOrientation();

		if (this.data && this.data.properties) {
			var hasWidth = false;

			if (this.data.properties.style) {
				var parse = CSSParser.parse(".foo{"+this.data.properties.style+"}");
	
				if (parse.model) {
					dojo.forEach(parse.model[0].children, dojo.hitch(this, function(prop) {
							if (prop.name == "width") {
								this.textBox.set("value", prop.value);
								hasWidth = true;
							}
					}));
				}
			}

			if (!hasWidth) {
				this.useRemaingingSpace.set("checked", true);
			}
		}
	}