function(value) {
					var match = value.match(/^(horizontal|vertical|constrainingHorizontal|constrainingVertical)$/);
					value = match ? match[0] : "composite";

					if (this._layout) {
						this._layout.destroy();
						this._layout = null;
					}

					this._layout = new Layouts[string.capitalize(value)](this);

					return value;
				}