function() {
			var parent = this._parent,
				parentWidth;
			if (parent) {
				if (isDef(parent.width)) {
					parentWidth = parent.width;
				} else if (isDef(parent.left) + isDef(parent.right) + !!(parent.center && isDef(parent.center.x)) < 2) {
					parentWidth = parent._defaultWidth;
				} else {
					parentWidth = UI.FILL;
				}
				parentWidth = parentWidth === UI.INHERIT ? parent._getInheritedWidth() : parentWidth
				return this._forceInheritenceToFillOrSize ? parentWidth === UI.SIZE ? UI.SIZE : UI.FILL : parentWidth;
			}
		}