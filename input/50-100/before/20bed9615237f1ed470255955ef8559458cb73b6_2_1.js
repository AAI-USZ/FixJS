function(event) {
						var state = CKEDITOR.TRISTATE_DISABLED,
							element = event.data.path.block.$;
							
						if(element.tagName == "PRE") {
							state = CKEDITOR.TRISTATE_OFF;
							self.setValue(getBrushFromClassName(element));
							if(CKEDITOR.env.ie) self.lastPre = element; // IE-Specific
							alert("Setting new pre");
						}
						
						//self.setState(state);
					}