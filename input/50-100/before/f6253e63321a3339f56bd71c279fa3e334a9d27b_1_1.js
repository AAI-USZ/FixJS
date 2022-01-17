function(type, e) {
			if (type === "click" || type === "singletap") {
				this._tableView && (this._tableView._tableViewSectionClicked = this);
			}
			Widget.prototype._handleTouchEvent.apply(this,arguments);
		}