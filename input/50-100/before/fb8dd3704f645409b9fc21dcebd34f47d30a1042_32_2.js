function(view) {
			var p = this.children.indexOf(view);
			if (p !== -1) {
				this.children.splice(p, 1);
				view._setParent();
				dom.detach(view.domNode);
				this._triggerLayout();
			}
		}