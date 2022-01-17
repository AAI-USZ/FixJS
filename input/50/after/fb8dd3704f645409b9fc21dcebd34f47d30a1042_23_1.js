function(v) {
				Widget.prototype.add.call(this, this[v] = UI.createView({ 
					height: UI.SIZE, 
					width: UI.INHERIT, 
					layout: UI._LAYOUT_CONSTRAINING_VERTICAL
				}));
			}