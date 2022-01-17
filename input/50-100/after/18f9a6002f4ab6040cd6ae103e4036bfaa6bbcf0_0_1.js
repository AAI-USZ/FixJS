function(prop) {
						if (prop.name == "width" && this.orientation == "H") {
							this.textBox.set("value", prop.value);
							hasValue = true;
						} else if (prop.name == "height" && this.orientation == "V") {
							this.textBox.set("value", prop.value);
							hasValue = true;
						}
					}