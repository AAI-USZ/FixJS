function(view) {
			var children = this.children,
				p = children.indexOf(view);
			if (p !== -1) {
				children.splice(p, 1);
				view._setParent();
				dom.detach(view.domNode);
				this._triggerLayout();
			}
		}