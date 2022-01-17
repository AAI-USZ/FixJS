function(args) {
			this._indexedContent = [];

			require.each(["_header", "_rows", "_footer"], lang.hitch(this, function(v) {
				Widget.prototype.add.call(this, this[v] = UI.createView({ 
					height: UI.SIZE, 
					width: UI.INHERIT, 
					layout: "vertical"
				}));
			}));

			// Create the parts out of Ti controls so we can make use of the layout system
			this.layout = "vertical";
		}