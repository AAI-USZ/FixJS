function(args) {
			this._indexedContent = [];

			var i = 0,
				l = 3,
				a = ["_header", "_rows", "_footer"];

			while (i < l) {
				this._add(this[a[i++]] = UI.createView({
					height: UI.SIZE,
					width: UI.INHERIT,
					layout: UI._LAYOUT_CONSTRAINING_VERTICAL
				}));
			}

			// Create the parts out of Ti controls so we can make use of the layout system
			this.layout = UI._LAYOUT_CONSTRAINING_VERTICAL;

			// Force single tap and long press to be enabled.
			on(this, "singletap", emptyfn);
			on(this, "longpress", emptyfn);
		}