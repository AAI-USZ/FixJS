function(prop) {
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
				}