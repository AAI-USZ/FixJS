function(prop) {
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
				}