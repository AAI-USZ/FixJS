function() {
			this._title.text = (this.window && this.window._getTitle()) || (this._tab && this._tab._getTitle()) || "";
		}