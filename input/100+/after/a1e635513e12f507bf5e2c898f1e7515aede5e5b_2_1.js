function(coords) {
		var titleBarHeight = dojo.marginBox(this.titleBar).h;

		if (coords) {
			// compute paddings
			var computedStyle = style.getComputedStyle(this.containerNode);
			var output = domGeometry.getPadExtents(this.containerNode, computedStyle);

			var c = {w: coords.w-output.w, h: coords.h-output.h}
			c.h -= dojo.marginBox(this.titleBar).h;

			var contentArea = dojo.query(".dijitDialogPaneContentArea", this.containerNode)[0];
			var actionArea = dojo.query(".dijitDialogPaneActionBar", this.containerNode)[0];

			// subtract actionbar area
			c.h -= dojo.marginBox(actionArea).h;

			if (c.w) {
				dojo.style(contentArea, "width", c.w+"px");
			}

			if (c.h) {
				dojo.style(contentArea, "height", c.h+"px");
			}

			// resize children
			dojo.forEach(this.getChildren(), dojo.hitch(this, function(child) {
					if (child.resize) {
						child.resize({w: c.w, h: c.h});
					}
			}));
		}

		this._position();
	}